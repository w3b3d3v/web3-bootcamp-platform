const functions = require('firebase-functions')
const { sendEmail, enqueueEmails } = require('./emails')
const { addDiscordRole } = require('./discord_integration')
const { userCompletedCourse, usersToSend2ndChance } = require('./lib/checkUserLessons')
const { mint } = require('./mintNFT.js')
const { getNextCohort } = require('./lib/second_chance_cohort')
const { usersBySection, storeUsersPerCohort } = require('./build_analytics')
const { PubSub } = require('@google-cloud/pubsub')
const pubsub = new PubSub()
const { cohortSignup, addDiscordUserToRole } = require('./pubsub.functions')
const { createUser } = require('./lib/mailchimp')
const { log_study_group } = require('./lib/log_study_group')
const { db, firebase } = require('./lib/initDb')
const { usersByStudyGroup, storeUsersPerStudyGroup } = require('./study_group_analytics')
const { fetchAndStoreIssues } = require('./fetchKanban')

exports.sendEmail = functions.https.onRequest(async (req, resp) => {
  const subject = req.query.subject || '🏕️ Seu primeiro Smart Contract na Ethereum'
  resp.send(await sendEmail(req.query.template, subject, req.query.to))
})

async function docData(collection, doc_id) {
  return { ...(await db.collection(collection).doc(doc_id).get()).data(), id: doc_id }
}

async function emailParams(cohort) {
  return {
    cohort: await docData('cohorts', cohort.cohort_id),
    course: await docData('courses', cohort.course_id),
  }
}

exports.onCohortSignup = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change, context) => {
    const previousUserValue = change.before.data()
    const user = change.after.data()

    const previousCohortData = previousUserValue.cohorts
      ? previousUserValue.cohorts.map((item) => item?.cohort_id)
      : []

    if (!user.cohorts) return

    const userNewCohorts = user.cohorts.filter(
      (item) => !previousCohortData?.includes(item.cohort_id)
    )
    const topic = pubsub.topic('router-pubsub')

    for (let cohortSnapshot of userNewCohorts) {
      const params = await emailParams(cohortSnapshot)
      //todo essas funções deveriam ser enfileiradas num pubsub para evitar falhas
      const emailRawData = {
        incoming_topic: 'cohort_signup',
        user_email: user.email,
        email_subject: params.cohort.email_content.subject,
        params,
      }
      const discordRawData = {
        incoming_topic: 'add_dc_user_to_role_on_cohort_signup',
        user_discord_id: user?.discord?.id,
        params,
      }
      const emailData = Buffer.from(JSON.stringify(emailRawData))
      const discordData = Buffer.from(JSON.stringify(discordRawData))

      topic.publishMessage({ data: emailData }, () =>
        console.log('Email topic published on cohort signup')
      )
      topic.publishMessage({ data: discordData }, () =>
        console.log('Add User to Discord Role published on cohort signup')
      )
    }
  })

exports.onDiscordConnect = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change, context) => {
    const previousUserValue = change.before.data()
    const newUserValue = change.after.data()

    function userConnectedDiscord() {
      return newUserValue.discord?.id && newUserValue.discord?.id !== previousUserValue.discord?.id
    }

    if (!userConnectedDiscord()) return

    for (let cohortSnapshot of newUserValue.cohorts) {
      const params = {
        cohort: docData('cohorts', cohortSnapshot.cohort_id),
      }
      //todo essas funções deveriam ser enfileiradas num pubsub para evitar falhas
      await Promise.all([addDiscordRole(newUserValue?.discord?.id, params.cohort.discord_role)])
    }
  })

const GRADUATED_ROLE_ID = '985557210794958948'

async function issueCertificate(user_id, cohort) {
  const user = await docData('users', user_id)
  const course = await docData('courses', cohort.course_id)
  if (!user.wallet) {
    console.log('user ' + user.email + ' without wallet')
    return
  }

  await mint(cohort, course.nft_title, user, (params) => {
    console.log('callback params:')
    console.log(params)
    addDiscordRole(params.user?.discord?.id, GRADUATED_ROLE_ID)
    sendEmail(
      'nft_delivery.js',
      '👷👷‍♀️ WEB3DEV - NFT Certificate Sent: ' + params.course_title,
      params.user.email,
      params
    )
    db.collection('nft_mints').add(params)
  })
}

exports.mintNFT = functions.firestore
  .document('lessons_submissions/{lessonId}')
  .onCreate(async (snap, context) => {
    const createdLesson = snap.data()

    let cohort = await docData('cohorts', createdLesson.cohort_id)

    const course = await docData('courses', cohort.course_id)

    if (createdLesson.lesson !== course.lastLesson) return console.log('Esta não é a última lição')

    if (!userCompletedCourse(createdLesson.user_id, cohort.course_id))
      return console.log('Usuário não completou todas as lições')

    if (cohort.endDate.toDate() < createdLesson.createdAt.toDate()) {
      cohort = await getNextCohort(cohort.course_id)
    }
    if (!cohort) return

    await issueCertificate(createdLesson.user_id, cohort)
  })

exports.mintAllMissing = functions
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(async (req, resp) => {
    const { getMissingNfts } = require('./lib/nft_mints')
    const [rows] = await getMissingNfts()

    console.log('minting for ' + rows.length + ' users')

    for (const row of rows) {
      let cohort = await docData('cohorts', row.cohort_id)

      try {
        console.log('minting for user ' + row.user_id + ' cohort ' + row.cohort_id)
        await issueCertificate(row.user_id, cohort)
      } catch (e) {
        console.log('error: ' + e)
      }
    }
    resp.send('ok')
    return
  })

exports.sendEmailJob = functions.pubsub.topic('course_day_email').onPublish((message) => {
  const data = JSON.parse(Buffer.from(message.data, 'base64'))

  console.log(`Sending message ${data.subject} template ${data.template} to ${data.to}`)

  return sendEmail(data.template, data.subject, data.to, data.params)
})

exports.sendEmailToAllUsers = functions.https.onRequest(async (req, resp) => {
  const cohort = await docData('cohorts', req.query.cohort_id)
  const course = await docData('courses', cohort.course_id)
  const users = (
    await db.collection('users').where('cohort_ids', 'array-contains', req.query.cohort_id).get()
  ).docs

  async function included_users(users, req) {
    if (req.query.exclude !== 'true') return users

    const exclude_ids = new Set(users.map((u) => u.data().uid))
    const result = (await db.collection('users').get()).docs.filter(
      (u) => !exclude_ids.has(u.data().uid)
    )
    return result
  }

  const emails = Array.from(new Set((await included_users(users, req)).map((u) => u.data().email)))

  enqueueEmails(emails, req.query.template, req.query.subject || cohort.email_content.subject, {
    cohort,
    course,
  })

  resp.send('OK')
})

exports.addUserToDiscord = functions.https.onRequest(async (req, resp) => {
  addUserToRole(req.query.user_id, req.query.role_id).then((r) => resp.send('OK'))
})

exports.sendNewChanceEmail = functions.https.onRequest(async (req, resp) => {
  const cohort_id = req.query.cohort_id
  const users = await usersToSend2ndChance(cohort_id)

  users.map((u) => {
    sendEmail('cohort_new_chance', 'Nova chance para finalizar o Build', u.email)
  })
  resp.send({ size: users.length, users: users })
})

exports.addAllUsersFromCohortToDiscord = functions.https.onRequest(async (req, resp) => {
  const cohort_id = req.query.cohort_id
  const cohort = await docData('cohorts', cohort_id)

  if (!cohort) {
    console.log('invalid cohort')
    return resp.send('invalid cohort')
  }

  const users = await db.collection('users').get()

  if (users.empty) {
    console.log('no users to change')
    return resp.send('no users')
  }

  users.forEach(async (doc) => {
    const data = doc.data()
    if (
      data.cohorts &&
      data.cohorts[0] &&
      data?.discord?.id &&
      data.cohorts.some((cohort) => cohort.cohort_id === cohort_id)
    ) {
      console.log(
        `Adicionando role ${cohort.discord_role} do curso no discord: ${data.discord.username}`
      )
      try {
        await addDiscordRole(data.discord.id, cohort.discord_role)
      } catch (exception) {
        console.log(exception)
      }
    }
  })
  resp.send('OK')
})

exports.grantDiscordRoleToNewcomer = functions.https.onRequest(async (req, resp) => {
  let grantedRoles = 0
  try {
    const users = (
      await db.collection('users').where('discord.id', '==', req.query.discordId).get()
    ).docs

    if (users.length === 0) {
      return resp.send({ status: 404 })
    } else {
      const user = users[0].data()

      let cohorts = user.cohorts
      for (userCohort of cohorts) {
        let cohort = await docData('cohorts', userCohort.cohort_id)
        if (cohort.discord_role) {
          console.log('adding role ' + cohort.discord_role + ' to user ' + user.discord.username)
          await addDiscordRole(req.query.discordId, cohort.discord_role)
          grantedRoles += 1
        }
      }

      resp.send({ status: 200, grantedRoles: grantedRoles, userCohortsLenght: cohorts.length })
    }
  } catch (e) {
    resp.send({ error: e, status: 500 })
  }
})

exports.fetchStoreBuildAnalytics = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('America/Sao_Paulo')
  .onRun(async (context) => {
    try {
      const [rows] = await usersBySection()
      await storeUsersPerCohort(rows)
      return true
    } catch (e) {
      console.log('error: ' + e)
      return false
    }
  })

exports.onUserCreated = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    const user = snap.data()
    const userId = snap.id
    const userEmail = user.email
    const topic = pubsub.topic('router-pubsub')
    const rawData = {
      incoming_topic: 'user_created',
      user,
    }
    console.log('publishing to router-pubsub:' + JSON.stringify(rawData))
    const data = Buffer.from(JSON.stringify(rawData))
    return await topic.publishMessage({ data })
  })

exports.router = functions.pubsub.topic('router-pubsub').onPublish(async (message) => {
  const json = JSON.parse(Buffer.from(message.data, 'base64'))
  console.log(`GOT TO THE ROUTER 2, YEA ! ${json.incoming_topic}`)

  const topic = pubsub.topic(json.incoming_topic)
  const data = Buffer.from(JSON.stringify(json))
  return await topic.publishMessage({ data })
})

exports.sendUserToMailchimpOnUserCreation = functions.pubsub
  .topic('user_created')
  .onPublish((message) => {
    const data = JSON.parse(Buffer.from(message.data, 'base64'))
    return createUser(data.user)
  })

exports.onCohortSignupMail = functions.pubsub.topic('cohort_signup').onPublish((message) => {
  const data = JSON.parse(Buffer.from(message.data, 'base64'))
  console.log(data)
  return cohortSignup(data)
})

exports.discordRoles = functions.pubsub
  .topic('add_dc_user_to_role_on_cohort_signup')
  .onPublish((message) => {
    const data = JSON.parse(Buffer.from(message.data, 'base64'))
    return addDiscordUserToRole(data)
  })

exports.grantDiscordRoleToNewcomer = functions.https.onRequest(async (req, resp) => {
  const discordId = req.query.discordId
  let grantedRoles = 0
  try {
    let user = await getUserByDiscordId(discordId)
    let cohorts = user.cohorts
    cohorts.forEach(async (cohort) => {
      let cohortData = await docData('cohorts', cohort.cohort_id)
      if (cohortData.discord_role) {
        await addDiscordRole(discordId, cohortData.discord_role)
        grantedRoles += 1
      }
    })

    resp.send({ status: 200, grantedRoles: grantedRoles, userCohortsLenght: cohorts.length })
  } catch (e) {
    resp.send({ error: e, status: 500 })
  }
})

exports.logStudents = functions.https.onRequest(async (req, resp) => {
  log_study_group(req.query.channel_id, resp)
})

const region = 'us-central1'
const projectId = firebase.app().options.projectId
const axios = require('axios')

exports.invokeLogStudentsEveryFiveMinutes = functions.pubsub
  .schedule('*/5 * * * *')
  .onRun(async (context) => {
    console.log('running every 5 minute')
    const url = `https://${region}-${projectId}.cloudfunctions.net/logStudents?channel_id=971893080410185728`
    try {
      const response = await axios.get(url)
      console.log('Success:', response.data) // `axios` wraps the response data in a `data` field
    } catch (error) {
      console.error('Error invoking logStudents:', error)
    }
  })

const { saveInvites } = require('./lib/discord_invites')
exports.saveDiscordInvites = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  await saveInvites()
})

exports.fetchStoreStudyGroupAnalytics = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('America/Sao_Paulo')
  .onRun(async (context) => {
    try {
      const [rows] = await usersByStudyGroup()
      await storeUsersPerStudyGroup(rows)
      return true
    } catch (e) {
      console.log('error: ' + e)
      return false
    }
  })

exports.fetchAndStoreIssues = fetchAndStoreIssues

exports.scheduledFetchAndStoreIssues = functions.pubsub
  .schedule('0 * * * *')
  .timeZone('America/Sao_Paulo')
  .onRun(async (context) => {
    try {
      await fetchAndStoreIssues()
      return true
    } catch (e) {
      console.log('error: ' + e)
      return false
    }
  })
