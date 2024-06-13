const admin = require('firebase-admin')
const fs = require('fs').promises // Use promises interface for fs

// Replace with the path to your downloaded service account key file
var serviceAccount = require('../firebase/dev-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

async function addSpecificCourse(courseData, courseName) {
  // Reference to the specific document in the 'groups' collection
  const courseRef = db.collection('groups').doc(courseName)

  // Set the course data in the specific document
  await courseRef.set(courseData)

  console.log(`Group '${courseName}' added successfully.`)
}

async function loadCourseDataAndAdd() {
  try {
    const coursesData = await fs.readFile('/Users/nomadbitcoin/Projects/web3-bootcamp-platform/scripts/New_Course_Data.json', 'utf8')
    const courses = JSON.parse(coursesData)

    // Loop through each course in the array and add it
    for (const course of courses) {
      await addSpecificCourse(course, course.courseName)
    }
  } catch (error) {
    console.error("Error loading or adding courses:", error)
  }
}

loadCourseDataAndAdd()