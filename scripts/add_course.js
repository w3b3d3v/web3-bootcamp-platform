const admin = require('firebase-admin');
const fs = require('fs').promises; // Use promises interface for fs

// Replace with the path to your downloaded service account key file
var serviceAccount = require('../firebase/dev-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addSpecificCourse(courseData, courseName) {
  // Referência ao documento com um nome específico na coleção 'courses'
  const courseRef = db.collection('courses').doc(courseName);

  // Configura os dados do curso no documento específico
  await courseRef.set(courseData);

  console.log(`Curso '${courseName}' adicionado com sucesso.`);
}

async function loadCourseDataAndAdd() {
  try {
    const courseData = JSON.parse(await fs.readFile('/Users/nomadbitcoin/Projects/web3-bootcamp-platform/scripts/New_Course_Data.json', 'utf8'));
    const courseName = "Rust_State_Machine"; // Nome específico para o documento

    // Chama a função para adicionar o curso com um nome específico
    await addSpecificCourse(courseData, courseName);
  } catch (error) {
    console.error("Erro ao carregar ou adicionar o curso:", error);
  }
}

loadCourseDataAndAdd();