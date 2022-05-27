const functions = require('firebase-functions')
const addUserToRole = require('./discord_integration')
const { sendEmail } = require('./emails')
const { PubSub } = require('@google-cloud/pubsub')
const admin = require('firebase-admin')
const { addDiscordRole } = require('./discord_integration')
admin.initializeApp()
const db = admin.firestore()

const pubsub = new PubSub()

exports.sendEmail = functions.https.onRequest(async (req, resp) => {
  const subject =
    req.query.subject || '🏕️ Seu primeiro Smart Contract na Ethereum'
  resp.send(await sendEmail(req.query.template, subject, req.query.to))
})

exports.sendNFTEmails = functions.https.onRequest(async (req, resp) => {
  const subject = '👷👷‍♀️ WEB3DEV - NFT Recebido: Smart Contract Solidity'

  people = require('../nfts/scripts/people.json')

  for(let i = 0;i < people.length;i++) {
    p = people[i]
    sendEmail('nft_delivery.js', subject, p.email, {
      course_title: 'Smart Contract Solidity',
      wallet_address: p.wallet,
      nft_contract: '0xa68580d4e41925c20af20dba9b4db17a79842f19',
      nft_id: i + 2,
    })
  }

  resp.send({ ok: 200 })
})

exports.onCohortSignup = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change, context) => {
    const previousUserValue = change.before.data()
    const newUserValue = change.after.data()
    const previousCohortData = previousUserValue.cohorts.map(item => item?.cohort_id)
    const userNewCohorts = newUserValue.cohorts.filter(item => !previousCohortData?.includes(item.cohort_id))

    const cohorts = db.collection('cohorts')
    const courses = db.collection('courses')

    for (let cohortSnapshot of userNewCohorts) {
      const params = {
        cohort: (await cohorts.doc(cohortSnapshot.cohort_id).get()).data(),
        course: (await courses.doc(cohortSnapshot.course_id).get()).data()
      }
      //todo essas funções deveriam ser enfileiradas num pubsub para evitar falhas
      await Promise.all([
        sendEmail('on_cohort_signup.js', params.cohort.email_content.subject, newUserValue.email, params),
        addDiscordRole(newUserValue?.discord?.id, params.cohort.discord_role)
      ])
    }
  })

exports.helloPubSub = functions.pubsub
  .topic('course_day_email')
  .onPublish((message) => {
    const data = JSON.parse(Buffer.from(message.data, 'base64'))

    console.log(
      `Sending message ${data.subject} template ${data.template} to ${data.to}`
    )

    return sendEmail(data.template, data.subject, data.to)
  })

exports.sendEmailToAllUsers = functions.https.onRequest(async (req, resp) => {
  db.collection('users')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const user = doc.data()
        if(user.email) {
          const messageObject = {
            to: user.email,
            template: req.query.template,
            subject: req.query.subject,
          }
          const messageBuffer = Buffer.from(
            JSON.stringify(messageObject),
            'utf8'
          )

          pubsub
            .topic('course_day_email')
            .publishMessage({ data: messageBuffer })
        }
      })
    })
  resp.send('OK')
})

exports.addUserToDiscord = functions.https.onRequest(async (req, resp) => {
  addUserToRole(req.query.user_id, req.query.role_id).then((r) =>
    resp.send('OK')
  )
})

exports.addAllUsersFromCohortToDiscord = functions.https.onRequest(
  async (req, resp) => {
    const cohort_id = req.cohort_id
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const data = doc.data()
          if(data.cohorts && data.cohorts[0] && data?.discord?.id) {
            console.log(
              'Adicionando no curso no discord: ' + data.discord?.username
            )
            try {
              await addUserToRole(data.discord.id, '971416421840064574')
            } catch(exception) {
              console.log(exception)
            }
          }
        })
      })
    resp.send('OK')
  }
)
