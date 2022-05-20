const nodemailer = require('nodemailer')
const mandrillTransport = require('nodemailer-mandrill-transport')

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

async function sendCourseDayEmail(template_name, to, cohort, course) {
  console.log(`Sending message template ${template_name} to ${to}`)
  const template = require(`./email_templates/${template_name}`)
  console.log(cohort)
  const mailOptions = {
    from: `danicuki <contato@${process.env.MANDRILL_DOMAIN}>`,
    subject: cohort.email_content.subject,
    html: template(cohort, course),
  }

  return await smtpTransport.sendMail({ ...mailOptions, to })
}

async function onCohortRegister(template_name, to, cohort, course) {
  console.log(`Sending message template ${template_name} to ${to}`)
  const template = require(`./email_templates/${template_name}`)
  const mailOptions = {
    from: `danicuki <contato@${process.env.MANDRILL_DOMAIN}>`,
    subject: cohort.email_content.subject,
    html: template(cohort, course),
  }

  return await smtpTransport.sendMail({ ...mailOptions, to })
}

module.exports = { sendEmail, sendCourseDayEmail, onCohortRegister }
