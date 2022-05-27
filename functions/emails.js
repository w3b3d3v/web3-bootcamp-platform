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

module.exports = { sendEmail }
