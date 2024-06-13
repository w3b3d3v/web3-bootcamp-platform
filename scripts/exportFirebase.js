const admin = require('firebase-admin')
const fs = require('fs')

// Inicializa o Firebase Admin SDK com as credenciais específicas
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://web3dev-bootcamp.firebaseio.com",
  projectId: "web3dev-bootcamp" 
})

const db = admin.firestore()

async function exportFirestore() {
  const collections = await db.listCollections()
  let data = {}

  for (const collection of collections) {
    const snapshot = await collection.limit(1).get()
    data[collection.id] = {}

    snapshot.forEach(doc => {
      data[collection.id][doc.id] = doc.data()
    })
  }

  fs.writeFileSync('seed-data.json', JSON.stringify(data, null, 2))
  console.log('Dados exportados com sucesso para backup.json')
}

exportFirestore().catch(console.error)