const test = require('firebase-functions-test')()

const { expect } = require('chai')
const chai = require('chai')
const { onCohortRegister, sendEmail } = require('../emails')
const assert = chai.assert
const { addDiscordRole } = require('../discord_integration')
const { mint } = require('../mintNFT')

//describe('Email Deliveries', () => {
//  const cohortSnap = test.firestore.makeDocumentSnapshot(
//    {
//      course_id: 'Solidity_And_Smart_Contracts',
//      discord_channel: 'Solidity-Smart-Contract',
//      discord_role: '971852940174319686',
//      kickoffStartTime: {
//        toDate: new Date(),
//      },
//      email_content: {
//        subject: '🏕️ Seu primeiro Smart Contract na Ethereum',
//      },
//    },
//    'cohorts/lloRUGwzJAG4Lj2B3bmJ'
//  )
//  const courseSnap = test.firestore.makeDocumentSnapshot(
//    {
//      duration: '1 semana',
//      title: 'Construa um App com Solidity + Ethereum Smart Contract',
//    },
//    'courses/Solidity_And_Smart_Contracts'
//  )
//  const userSnap = test.firestore.makeDocumentSnapshot({
//    discord: {
//      id: '342174857057927169',
//    },
//    email: 'romuloazk@gmail.com',
//  })
//  const email = `example+${(Math.random() * 10).toFixed(1)}@yahoo.com`

//  it('should email after cohort signup', async () => {
//    const params = { cohort: cohortSnap.data(), course: courseSnap.data() }
//    const sendFunction = await sendEmail(
//      'on_cohort_signup.js',
//      cohortSnap.data().email_content.subject,
//      userSnap.data().email,
//      params
//    )
//    expect(sendFunction).to.be.an('object')
//    expect(sendFunction).to.haveOwnProperty('messageId')
//    expect(sendFunction.accepted[0].email).to.be.equal(
//      userSnap.data().email
//    )
//  })

//  it('should add discord_role after cohort signup if discord is connected', async () => {
//    const addUser = await addDiscordRole(
//      userSnap.data().discord.id,
//      cohortSnap.data().discord_role
//    )
//    expect(addUser).to.have.lengthOf(0)
//  })
//})

describe('Mint NFT', () => {
  const cohortSnap = test.firestore.makeDocumentSnapshot(
    {
      course_id: 'Solidity_And_Smart_Contracts',
      discord_channel: 'Solidity-Smart-Contract',
      discord_role: '971852940174319686',
      email_content: {
        subject: '🏕️ Seu primeiro Smart Contract na Ethereum',
      },
      name: 'Exploradores'
    },
    'cohorts/O86fRsiUkeRP3Qk4EAtS'
  )
  const courseSnap = test.firestore.makeDocumentSnapshot(
    {
      duration: '1 semana',
      title: 'Construa um App com Solidity + Ethereum Smart Contract',
      nft_title: 'Smart Contract Solidity'
    },
    'courses/Solidity_And_Smart_Contracts'
  )
  const userSnap = test.firestore.makeDocumentSnapshot({
    wallet: '0xa0F3b68C2280A44857962a192676dc26aa0EFB48',
    email: 'romuloazk@gmail.com'
  })
  it('should mint nft', async () => {
    await mint(cohortSnap.data(), courseSnap.data().nft_title, userSnap.data())
  }).timeout(10000)
})
