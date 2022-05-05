const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const mandrillTransport = require('nodemailer-mandrill-transport')
const addUserToRole = require('./discord_integration')

const smtpTransport = nodemailer.createTransport(
  mandrillTransport({
    auth: {
      apiKey: process.env.MANDRILL_KEY,
    },
  })
)

const mailOptions = {
  from: `daniel@${process.env.MANDRILL_DOMAIN}`,
  subject: 'This is from Mandrill',
  text: 'Oi Danie,\nTudo bem? Legal!\nBeleza!',
}

// Sending email.

exports.sendEmail = functions.https.onRequest((req, resp) => {
  const to = req.query.to

  functions.logger.info('Sending Emails!', { structuredData: true })

  smtpTransport.sendMail({ ...mailOptions, to }, function (error, response) {
    if (error) {
      return resp.send(error)
    }
    resp.send(JSON.stringify(response))
  })
})

exports.addUserToDiscord = functions.https.onRequest(async (req, resp) => {
  addUserToRole(req.query.user_id, req.query.role_id).then((r) =>
    resp.send('OK')
  )
})

exports.addAllUsersFromCohortToDiscord = functions.https.onRequest(
  async (req, resp) => {
    const cohort_id = req.cohort_id
  }
)
