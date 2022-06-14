const test = require('firebase-functions-test')()

const { expect } = require('chai')
const chai = require('chai')
const { sendEmail } = require('../emails')
const assert = chai.assert
const { mint } = require('../mintNFT')

describe('Mint NFT', () => {
  const cohortSnapOne = test.firestore.makeDocumentSnapshot(
    {
      course_id: 'Solidity_And_Smart_Contracts',
      discord_channel: 'Solidity-Smart-Contract',
      discord_role: '971852940174319686',
      email_content: {
        subject: '🏕️ Seu primeiro Smart Contract na Ethereum',
      },
      endDate: new Date('2022 , 06 , 10'),
      name: 'Pioneiros',
    },
    'cohorts/O86fRsiUkeRP3Qk4EAtS'
  )
  const cohortSnapTwo = test.firestore.makeDocumentSnapshot(
    {
      course_id: 'Solidity_And_Smart_Contracts',
      discord_channel: 'Solidity-Smart-Contract',
      discord_role: '971852940174319686',
      email_content: {
        subject: '🏕️ Seu primeiro Smart Contract na Ethereum',
      },
      endDate: new Date('2022 , 06 , 15').getTime(),
      name: 'Exploradores',
    },
    'cohorts/123fRsiUkeRP3Qk4EAtS'
  )
  const courseSnap = test.firestore.makeDocumentSnapshot(
    {
      duration: '1 semana',
      title: 'Construa um App com Solidity + Ethereum Smart Contract',
      nft_title: 'Smart Contract Solidity',
    },
    'courses/Solidity_And_Smart_Contracts'
  )
  const userSnap = test.firestore.makeDocumentSnapshot({
    wallet: '0x2aC6BfBEF50cb99901fdB14262b86b8605b96b3c',
    email: 'romuloazk@gmail.com',
    cohorts: [
      {
        cohort_id: 'O86fRsiUkeRP3Qk4EAtS',
        course_id: 'Solidity_And_Smart_Contracts',
      },
    ],
  })
  //it('should mint nft', async () => {
  //  await mint(cohortSnapOne.data(), courseSnap.data().nft_title, userSnap.data())
  //}).timeout(25000)
})
