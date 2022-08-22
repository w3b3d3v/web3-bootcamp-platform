const { addDiscordRole } = require('./discord_integration')
const { sendEmail } = require('./emails')

async function cohortSignup(data) {
  try {
    await sendEmail(
      'on_cohort_signup.js',
      data.email_params.cohort.email_content.subject,
      data.user_email,
      data.params
    )
  } catch (error) {
    console.log(error)
  }
}

async function addDiscordUserToRole(data) {
  try {
    addDiscordRole(data.user_discord_id, data.params.cohort.discord_role)
  } catch (error) {
    console.log(error)
  }
}
function newUser(data) {
  return console.log('new user has been created with email', data.user_email)
}

module.exports = { cohortSignup, newUser, addDiscordUserToRole }
