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

async function readAllTasks() {
  try {
    // Referência à coleção 'tasks' no Firestore do bootcamp
    const tasksRef = bootcampDb.collection('tasks')
    const snapshot = await tasksRef.get()

    if (snapshot.empty) {
      console.log('No matching documents.')
      return []
    }

    const tasks = []
    snapshot.forEach((doc) => {
      tasks.push({ id: doc.id, data: doc.data() })
    })

    console.log(`Retrieved ${tasks.length} tasks.`)
    return tasks
  } catch (error) {
    console.error('Error reading tasks:', error)
    return []
  }
}

async function writeTaskToDevelopment(taskData) {
  try {
    // Referência à coleção 'tasks' no Firestore do development
    const taskRef = developmentDb.collection('tasks')

    // Adiciona um novo documento com ID autogerado
    const docRef = await taskRef.add(taskData)

    console.log(`Task added successfully to development with ID: ${docRef.id}`)
  } catch (error) {
    console.error('Error writing task to development:', error)
  }
}

async function saveTasksToJSON(tasks) {
  try {
    // Caminho do arquivo onde os dados serão salvos
    const filePath = './seed-data.json'

    // Prepara os dados das tarefas no formato correto
    const tasksObject = {
      tasks: {},
    }

    tasks.forEach((task) => {
      tasksObject.tasks[task.id] = task.data
    })

    // Salva todos os dados das tarefas em um único arquivo JSON
    await fs.writeFile(filePath, JSON.stringify(tasksObject, null, 2), 'utf8')

    console.log(`All task data saved to ${filePath}`)
  } catch (error) {
    console.error('Error saving tasks to JSON:', error)
  }
}

async function transferAllTasks() {
  try {
    const tasks = await readAllTasks()
    for (const task of tasks) {
      await writeTaskToDevelopment(task.data)
    }
    await saveTasksToJSON(tasks)
  } catch (error) {
    console.error('Error transferring tasks:', error)
  }
}

// Exemplo de uso: transferir todas as tarefas
transferAllTasks()
