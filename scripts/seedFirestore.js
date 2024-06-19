const { initializeApp } = require('firebase/app')
const {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  doc,
  setDoc,
  Timestamp,
} = require('firebase/firestore')
const admin = require('firebase-admin')
const fs = require('fs')

// Inicializa o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

const firebaseConfig = {
  projectId: 'web3dev-development',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

connectFirestoreEmulator(db, 'localhost', 8080)

function convertToFirestoreTimestamps(data) {
  if (data !== null && typeof data === 'object') {
    if (data._seconds !== undefined && data._nanoseconds !== undefined) {
      return new Timestamp(data._seconds, data._nanoseconds)
    }
    for (const key in data) {
      data[key] = convertToFirestoreTimestamps(data[key])
    }
  }
  return data
}

async function seedFirestore() {
  const backupFile = 'seed-data.json'
  const data = JSON.parse(fs.readFileSync(backupFile, 'utf8'))

  for (const [collectionName, documents] of Object.entries(data)) {
    for (let [docId, docData] of Object.entries(documents)) {
      docData = convertToFirestoreTimestamps(docData) // Converte valores para Timestamps
      const docRef = doc(collection(db, collectionName), docId)
      await setDoc(docRef, docData)
    }
  }

  console.log('Dados de seed inseridos com sucesso!')
}

seedFirestore()
.catch(console.error)
.finally(() => {
  process.exit()
})