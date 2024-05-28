const admin = require('firebase-admin');
const fs = require('fs').promises; // Use promises interface for fs

// Replace with the path to your downloaded service account key file
var serviceAccount = require('../firebase/dev-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function updateStudyGroups() {
  try {
    // Read the JSON file containing study groups data
    const studyGroupsData = await fs.readFile('/Users/nomadbitcoin/Projects/web3-bootcamp-platform/scripts/Study_Groups_Data.json', 'utf8');
    const studyGroups = JSON.parse(studyGroupsData);

    // Loop through each study group and update the document in Firestore
    for (const [id, data] of Object.entries(studyGroups)) {
      const studyGroupRef = db.collection('study_groups').doc(id);
      await studyGroupRef.set(data, { merge: true });
      console.log(`Study group '${id}' updated successfully.`);
    }
  } catch (error) {
    console.error('Error reading or updating study groups:', error);
  }
}

updateStudyGroups();
