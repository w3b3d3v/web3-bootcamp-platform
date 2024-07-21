const admin = require('firebase-admin')
const fs = require('fs').promises // Use promises interface for fs

// Initialize the Firebase Admin SDK for the web3dev-bootcamp
const bootcampApp = admin.initializeApp(
  {
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://web3dev-bootcamp.firebaseio.com',
    projectId: 'web3dev-bootcamp',
  },
  'bootcamp'
)

const bootcampDb = bootcampApp.firestore()

// Initialize the Firebase Admin SDK for the web3dev-development
const developmentApp = admin.initializeApp(
  {
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://web3dev-development.firebaseio.com',
    projectId: 'web3dev-development',
  },
  'development'
)

const developmentDb = developmentApp.firestore()

const excludeFromMigration = [] // Replace with actual course names to exclude

async function readAllCourses() {
  try {
    // Reference to the 'courses' collection in the bootcamp Firestore
    const coursesRef = bootcampDb.collection('courses')
    const snapshot = await coursesRef.get()

    if (snapshot.empty) {
      console.log('No courses found.')
      return []
    }

    const courses = []
    snapshot.forEach((doc) => {
      if (!excludeFromMigration.includes(doc.id)) {
        courses.push({ id: doc.id, data: doc.data() })
      }
    })

    return courses
  } catch (error) {
    console.error('Error reading courses:', error)
  }
}

async function writeCourseToDevelopment(courseData, courseName) {
  try {
    // Reference to the specific document in the 'courses' collection in the development Firestore
    const courseRef = developmentDb.collection('courses').doc(courseName)

    // Set the course data in the specific document
    await courseRef.set(courseData)

    console.log(`Course '${courseName}' added successfully to development.`)
  } catch (error) {
    console.error('Error writing course to development:', error)
  }
}

async function saveCourseToJSON(courseData, courseName) {
  try {
    // Path of the file where the data will be saved
    const filePath = `./scripts/files/${courseName}.json`

    // Save the course data to a JSON file
    await fs.writeFile(filePath, JSON.stringify(courseData, null, 2), 'utf8')

    console.log(`Course data saved to ${filePath}`)
  } catch (error) {
    console.error('Error saving course to JSON:', error)
  }
}

async function transferCourses() {
  try {
    const courses = await readAllCourses()
    for (const course of courses) {
      await writeCourseToDevelopment(course.data, course.id)
      await saveCourseToJSON(course.data, course.id)
    }
  } catch (error) {
    console.error('Error transferring courses:', error)
  }
}

transferCourses()
