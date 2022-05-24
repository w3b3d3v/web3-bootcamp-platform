const test = require('firebase-functions-test')()

const { expect } = require('chai')
const chai = require('chai')
const { onCohortRegister } = require('../emails')
const assert = chai.assert
const { addUserToRole } = require('../discord_integration')

describe('Email Deliveries', () => {
  const cohortSnap = test.firestore.makeDocumentSnapshot(
    {
      course_id: 'Solidity_And_Smart_Contracts',
      discord_channel: 'Solidity-Smart-Contract',
      discord_role: '971852940174319686',
      email_content: {
        subject: '🏕️ Seu primeiro Smart Contract na Ethereum',
      },
    },
    'cohorts/lloRUGwzJAG4Lj2B3bmJ'
  )
  const courseSnap = test.firestore.makeDocumentSnapshot(
    {
      duration: '1 semana',
      title: 'Construa um App com Solidity + Ethereum Smart Contract',
    },
    'courses/Solidity_And_Smart_Contracts'
  )
  const userSnap = test.firestore.makeDocumentSnapshot({
    discord: {
      id: '342174857057927169',
    },
    email: 'romuloazk@gmail.com',
  })
  const email = `example+${(Math.random() * 10).toFixed(1)}@yahoo.com`

  it('should email after cohort signup', async () => {
    const params = { cohort: cohortSnap.data(), course: courseSnap.data() }
    const sendFunction = await sendEmail(
      'on_cohort_signup.js',
      cohortSnap.data().email_content.subject,
      userSnap.data().email,
      params
    )
    expect(sendFunction).to.be.an('object')
  })

  it('should add discord_role after cohort signup if discord is connected', async () => {
    const addUser = await addDiscordRole(
      userSnap.data().discord.id,
      cohortSnap.data().discord_role
    )
    expect(addUser).to.be.an('ArrayBuffer')
  })

  it('should add discord_role after cohort signup if discord is connected', async () => {
    const addUser = await addUserToRole(
      userSnap.data().discord.id,
      cohortSnap.data().discord_role
    )
    expect(addUser.byteLength).to.equal(0)
  })
})
