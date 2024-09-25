const mailchimp = require('@mailchimp/mailchimp_marketing')

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
})

exports.addUserToList = async function (emailData) {
  const userEmail = emailData.user_email
  const cohort = emailData.params.cohort
  const course = emailData.params.course

  await mailchimp.lists.addListMember(cohort, {
    email_address: userEmail,
    status: 'subscribed',
  })

  await mailchimp.lists.addListMember(course, {
    email_address: userEmail,
    status: 'subscribed',
  })
}

exports.createUser = async function (user) {
  try {
    const result = await mailchimp.lists.addListMember('b578d43584', {
      email_address: user.email,
      status: 'subscribed',
      full_name: user.name,
      merge_fields: { WALLET: user.wallet_address, NAME: user.name },
    })
    console.log('User added to Mailchimp successfully:')
  } catch (error) {
    console.error(error)
  }
}
