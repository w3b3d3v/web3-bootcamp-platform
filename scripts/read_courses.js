const admin = require('firebase-admin');

var serviceAccount = require('../firebase/dev-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Lista de coleções a serem lidas
const collectionsToRead = ['courses'];

// Função para imprimir os dados das coleções
collectionsToRead.forEach((collectionName) => {
  db.collection(collectionName)
    .get()
    .then((snapshot) => {
      console.log(`Dados da coleção: ${collectionName}`);
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((error) => {
      console.log(`Erro ao ler a coleção ${collectionName}:`, error);
    });
});
