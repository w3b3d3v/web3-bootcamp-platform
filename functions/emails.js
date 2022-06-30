const nodemailer = require('nodemailer')
const mandrillTransport = require('nodemailer-mandrill-transport')
const { PubSub } = require('@google-cloud/pubsub')
const pubsub = new PubSub()

const smtpTransport = nodemailer.createTransport(
  mandrillTransport({
    auth: {
      apiKey: process.env.MANDRILL_KEY,
    },
  })
)

async function sendEmail(template_name, subject, to, params = {}) {
  console.log(`Sending message template ${template_name} to ${to}`)

  const template = require(`./email_templates/${template_name}`)

  const mailOptions = {
    from: `danicuki <contato@${process.env.MANDRILL_DOMAIN}>`,
    subject,
    html: template(params),
  }

  return await smtpTransport.sendMail({ ...mailOptions, to })
}

async function enqueueEmails(emails, template, subject, params) {
  for (to of emails) {
    const messageObject = { to,template,subject,params }
    const messageBuffer = Buffer.from(JSON.stringify(messageObject), 'utf8')
    pubsub.topic('course_day_email').publishMessage({ data: messageBuffer })
  }
  console.log('Sent emails: ' + emails.length)
}

module.exports = { sendEmail, enqueueEmails }
