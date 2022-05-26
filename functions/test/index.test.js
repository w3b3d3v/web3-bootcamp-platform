const test = require('firebase-functions-test')()

const { expect } = require('chai')
const chai = require('chai')
const { onCohortRegister } = require('../emails')
const assert = chai.assert
const { addUserToRole } = require('../discord_integration')

describe('Email Deliveries', () => {
  const cohortSnap = test.firestore.makeDocumentSnapshot({
    course_id: 'Solidity_And_Smart_Contracts',
    discord_channel: "Solidity-Smart-Contract",
    discord_role: '971852940174319686',
    email_deliveries: {
      signup: false
    },
    email_content: {
      subject: '🏕️ Seu primeiro Smart Contract na Ethereum',
    }
  }, 'cohorts/lloRUGwzJAG4Lj2B3bmJ')
  const courseSnap = test.firestore.makeDocumentSnapshot({
    duration: "1 semana",
    title: "Construa um App com Solidity + Ethereum Smart Contract",
  }, 'courses/Solidity_And_Smart_Contracts')
  const userSnap = test.firestore.makeDocumentSnapshot({
    discord: {
      id: '342174857057927169',
    }
  })
  const email = `example+${(Math.random() * 10).toFixed(1)}@yahoo.com`

  it('should email after cohort signup', async () => {
    const sendEmail = await onCohortRegister('on_cohort_signup.js', email, cohortSnap.data(), courseSnap.data())
    expect(sendEmail.accepted[0].status).to.equal('sent')
  })

  it('should set email_deliveries to true after send email', async () => {
    const sendEmail = await onCohortRegister('on_cohort_signup.js', email, cohortSnap.data(), courseSnap.data())
    expect(sendEmail.accepted[0].status).to.equal('sent')
    const cohortAfter = test.makeChange(cohortSnap, {
      email_deliveries: {
        signup: true
      }
    })
    expect(cohortAfter.after.email_deliveries.signup).to.equal(true)
  })

  it('should add discord_role after cohort signup if discord is connected', async () => {
    const addUser = await addUserToRole(userSnap.data().discord.id, cohortSnap.data().discord_role)
    expect(addUser.byteLength).to.equal(0)
  })
})