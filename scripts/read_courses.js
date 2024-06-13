const admin = require('firebase-admin')
const fs = require('fs').promises // Use promises interface for fs

// Replace with the path to your downloaded service account key file
var serviceAccount = require('../firebase/dev-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

async function readStudyGroups() {
  try {
    // Reference to the 'study_groups' collection
    const studyGroupsRef = db.collection('study_groups')
    const snapshot = await studyGroupsRef.get()

    if (snapshot.empty) {
      console.log('No matching documents.')
      return
    }

    // Create an object to store the study group documents with their IDs
    const studyGroups = {}
    snapshot.forEach(doc => {
      studyGroups[doc.id] = doc.data()
    })

    // Convert the object to JSON string
    const studyGroupsJson = JSON.stringify(studyGroups, null, 2)

    // Write the JSON string to a file
    await fs.writeFile('/Users/nomadbitcoin/Projects/web3-bootcamp-platform/scripts/Study_Groups_Data.json', studyGroupsJson, 'utf8')

    console.log('Study groups data saved to Study_Groups_Data.json')
  } catch (error) {
    console.error('Error reading or writing study groups:', error)
  }
}

readStudyGroups()
