const admin = require('firebase-admin')
const fs = require('fs').promises // Use promises interface for fs

// Inicializa o Firebase Admin SDK para o web3dev-bootcamp
const bootcampApp = admin.initializeApp(
  {
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://web3dev-bootcamp.firebaseio.com',
    projectId: 'web3dev-bootcamp',
  },
  'bootcamp'
)

const bootcampDb = bootcampApp.firestore()

// Inicializa o Firebase Admin SDK para o web3dev-development
const developmentApp = admin.initializeApp(
  {
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://web3dev-development.firebaseio.com',
    projectId: 'web3dev-development',
  },
  'development'
)

const developmentDb = developmentApp.firestore()

async function readSpecificCourse(courseName) {
  try {
    // Referência ao documento específico na coleção 'courses' no Firestore do bootcamp
    const courseRef = bootcampDb.collection('tasks').doc(courseName)
    const doc = await courseRef.get()

    if (!doc.exists) {
      console.log('No matching document.')
      return null
    }

    console.log('Course data:', doc.data())
    return doc.data()
  } catch (error) {
    console.error('Error reading course:', error)
  }
}

async function writeCourseToDevelopment(courseData, courseName) {
  try {
    // Referência ao documento específico na coleção 'courses' no Firestore do development
    const courseRef = developmentDb.collection('tasks').doc(courseName)

    // Define os dados do curso no documento específico
    await courseRef.set(courseData)

    console.log(`Course '${courseName}' added successfully to development.`)
  } catch (error) {
    console.error('Error writing course to development:', error)
  }
}

async function saveCourseToJSON(courseData, courseName) {
  try {
    // Caminho do arquivo onde os dados serão salvos
    const filePath = `./scripts/${courseName}.json`

    // Salva os dados do curso em um arquivo JSON
    await fs.writeFile(filePath, JSON.stringify(courseData, null, 2), 'utf8')

    console.log(`Course data saved to ${filePath}`)
  } catch (error) {
    console.error('Error saving course to JSON:', error)
  }
}

async function transferCourse(courseName) {
  try {
    const courseData = await readSpecificCourse(courseName)
    if (courseData) {
      await writeCourseToDevelopment(courseData, courseName)
      await saveCourseToJSON(courseData, courseName)
    }
  } catch (error) {
    console.error('Error transferring course:', error)
  }
}

transferCourse('Solidity_And_Smart_Contracts')
