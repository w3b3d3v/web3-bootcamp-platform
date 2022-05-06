const nodemailer = require('nodemailer')
const mandrillTransport = require('nodemailer-mandrill-transport')

const smtpTransport = nodemailer.createTransport(
  mandrillTransport({
    auth: {
      apiKey: process.env.MANDRILL_KEY,
    },
  })
)

async function sendEmail(template_name, subject, to) {
  console.log(`Sending message template ${template_name} to ${to}`)

  const mailOptions = {
    from: `danicuki <contato@${process.env.MANDRILL_DOMAIN}>`,
    subject,
    html: require(`./email_templates/${template_name}`),
  }

  return await smtpTransport.sendMail({ ...mailOptions, to })
}

module.exports = { sendEmail }
