const admin = require('firebase-admin')

// Initialize Firebase Admin SDK for the web3dev-development
const developmentApp = admin.initializeApp(
  {
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://web3dev-development.firebaseio.com',
    projectId: 'web3dev-development',
  },
  'development'
)

const developmentDb = developmentApp.firestore()

async function readAndModifyCourse(courseDoc) {
  try {
    const courseData = courseDoc.data()

    // Create the modified course data
    const modifiedCourseData = {
      ...courseData,
      metadata: {
        pt: {
          sections: courseData.sections || {},
          title: courseData.title || '',
          nft_title: courseData.nft_title || '',
          difficulty: courseData.difficulty || '',
          duration: courseData.duration || '',
          description: courseData.description || '',
        },
      },
    }

    console.log(`Modified Course Data for '${courseDoc.id}':`, modifiedCourseData)
    return modifiedCourseData
  } catch (error) {
    console.error(`Error reading course '${courseDoc.id}':`, error)
  }
}

async function writeModifiedCourse(courseData, courseDoc) {
  try {
    // Update the document with modified data
    await courseDoc.ref.set(courseData)
    console.log(`Course '${courseDoc.id}' updated successfully.`)
  } catch (error) {
    console.error(`Error writing course '${courseDoc.id}':`, error)
  }
}

async function modifyAllCoursesMetadata() {
  try {
    const coursesSnapshot = await developmentDb.collection('courses').get()
    if (coursesSnapshot.empty) {
      console.log('No courses found.')
      return
    }

    const coursePromises = coursesSnapshot.docs.map(async (courseDoc) => {
      const courseData = await readAndModifyCourse(courseDoc)
      if (courseData) {
        await writeModifiedCourse(courseData, courseDoc)
      }
    })

    await Promise.all(coursePromises)
    console.log('All courses have been processed.')
  } catch (error) {
    console.error('Error modifying all courses metadata:', error)
  }
}

modifyAllCoursesMetadata()
