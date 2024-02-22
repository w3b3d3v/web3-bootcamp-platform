const admin = require('firebase-admin');
const fs = require('fs').promises; // Use promises interface for fs

// Replace with the path to your downloaded service account key file
var serviceAccount = require('../firebase/dev-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addCohort(cohortData) {
    // Adiciona o cohort na coleção 'cohorts' com um ID gerado automaticamente
    const cohortRef = await db.collection('cohorts').add(cohortData);

    console.log(`Cohort adicionado com sucesso com o ID: ${cohortRef.id}`);
}

async function createAndAddCohort() {
  const cohortData = {
    "course_id": "Rust_State_Machine", // ID do curso correspondente
    "discord_channel": "RustStateMachineBeginners",
    "discord_role": "rust-state-machine",
    "email_content": {
      "subject": "Welcome to course Rust State Machine!",
    },
    "endDate": admin.firestore.Timestamp.fromDate(new Date('2024-12-31')),
    "kickoffEndTime": admin.firestore.Timestamp.fromDate(new Date('2024-01-02 23:59')),
    "kickoffStartTime": admin.firestore.Timestamp.fromDate(new Date('2024-01-01 00:00')),
    "name": "Cohort 1: Rust State Machine Beginners",
    "nft_title": "Rust State Machine Beginner Certificate",
    "startDate": admin.firestore.Timestamp.fromDate(new Date('2024-01-01'))
  };

  await addCohort(cohortData);
}

createAndAddCohort();