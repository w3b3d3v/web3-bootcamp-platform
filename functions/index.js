const functions = require('firebase-functions')
const { sendEmail, enqueueEmails } = require('./emails')
const admin = require('firebase-admin')
const { addDiscordRole } = require('./discord_integration')
const { userCompletedCourse, usersToSend2ndChance } = require('./lib/checkUserLessons')
const { mint } = require('./mintNFT.js')
const { getNextCohort } = require('./second_chance_cohort')
const { PubSub } = require('@google-cloud/pubsub');

admin.initializeApp()

const db = admin.firestore()

const pubsub = new PubSub();

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

    const previousCohortData = previousUserValue.cohorts.map((item) => item?.cohort_id)

    const userNewCohorts = user.cohorts.filter(
      (item) => previousCohortData?.includes(item.cohort_id)
    )

    for (let cohortSnapshot of userNewCohorts) {
      const params = await emailParams(cohortSnapshot);
      const emailRawData = {
        incoming_topic: 'cohort_signup',
        user_email: user?.email,
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

      try {
        await pubsub.topic('discord-topic').publishMessage({ data: discordData });
        console.log('Email topic published on cohort signup');
      } catch (error) {
        console.error('Failed to publish email topic:', error);
      }

      await pubsub.topic('email-topic')
      .publishMessage({ data: emailData }, 
      () => console.log('Add User to Discord Role published on cohort signup'))
    }
});

exports.cohortSignupQueue = functions.pubsub.topic('email-topic').onPublish(async (message) => {
  const emailData = JSON.parse(Buffer.from(message.data, 'base64'))
  const userEmail = emailData.user_email;
  const cohort = emailData.params.cohort;
  const course = emailData.params.course;
  const mailchimp = require("@mailchimp/mailchimp_marketing");

  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER,
  });

  await mailchimp.lists.addListMember(cohort, {
    email_address: userEmail,
    status: 'subscribed',
  });

  await mailchimp.lists.addListMember(course, {
    email_address: userEmail,
    status: 'subscribed',
  });
});

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
      
      
    }
  })

exports.userCreatedQueue = functions.pubsub.topic('user_created').onPublish(async (message) => {
  const data = JSON.parse(Buffer.from(message.data, 'base64'))
  const user = data.user
  const listId = data.incoming_topic;
  const mailchimp = require('@mailchimp/mailchimp_marketing')

  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER,
  });
  await mailchimp.lists.addListMember(listId, {
    email_address: user.email,
    status:'subscribed',
  });
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
      '👷👷‍♀️ WEB3DEV - NFT Recebido: ' + params.course_title,
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

    if (!userCompletedCourse(createdLesson.user_id, cohort.course_id, db))
      return console.log('Usuário não completou todas as lições')

    if (cohort.endDate.toDate() < createdLesson.createdAt.toDate()) {
      cohort = await getNextCohort(cohort.course_id, db)
    }
    if (!cohort) return

    await issueCertificate(createdLesson.user_id, cohort)
  })

exports.mintAllMissing = functions
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(async (req, resp) => {
    const userLessons = await db
      .collection('lessons_submissions')
      .where('lesson', 'in', [
        'Lesson_2_Ship_It.md',
        'Lesson_2_Finalize_And_Celebrate.md',
        'Lesson_2_Finishing_Touches_Contract.md',
      ])
      .where('createdAt', '>', new Date(2023, 01, 1, 1))
      .orderBy('createdAt')
      .get()
    const itens = userLessons.docs
    console.log(itens.length)
    for (l of itens) {
      const d = l.data()
      console.log({ user_id: d.user_id, date: d.createdAt.toDate() })
      let cohort = await docData('cohorts', d.cohort_id)

      if (cohort.endDate.toDate() < d.createdAt.toDate()) {
        console.log('changing cohort...')
        cohort = await getNextCohort(cohort.course_id, db)
        console.log(cohort.name)
      }
      try {
        await issueCertificate(d.user_id, cohort)
      } catch (e) {
        console.log('error: ' + e)
      }
    }
    resp.send('ok')
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
  const users = await usersToSend2ndChance(db, cohort_id)

  users.map((u) => {
    sendEmail('cohort_new_chance', 'Nova chance para finalizar o Bootcamp', u.email)
  })
  // sendEmail('cohort_new_chance', 'Nova chance para finalizar o Bootcamp', 'danicuki@gmail.com')
  resp.send({ size: users.length, users: users })
})

exports.addAllUsersFromCohortToDiscord = functions.https.onRequest(async (req, resp) => {
  const cohort_id = req.query.cohort_id
  const cohort = docData('cohorts', cohort_id)

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
      data.cohorts[0].cohort_id === cohort_id
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
