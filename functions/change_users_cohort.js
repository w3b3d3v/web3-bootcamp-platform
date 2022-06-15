const admin = require('firebase-admin')
var serviceAccount = require('../firebase/dev-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()
let userNumber = 0
let currentCohortId = 'DIdCT7JYteDCs2LXFOVI'
let nextCohortId = 'LNYQZCn5p9amT9VUJVhs'
let course_id = 'Solidity_And_Smart_Contracts'

db.collection('users')
  .get()
  .then((snapshot) => {
    snapshot.forEach(async (document) => {
      const userRef = db.collection('users').doc(document.id)
      const data = document.data()
      if (await userCompletedCourse(document.id, course_id)) return
      console.log(`Atualizando usuário ${(userNumber += 1)}...`)
      const cohortsToKeep = data.cohorts.filter((cohort) => cohort.course_id !== course_id)
      const cohortToBeReplaced = data.cohorts.filter((item) => item.course_id == course_id)
      const userSubscriptionDate = cohortToBeReplaced[0].subscriptionDate
      cohortToBeReplaced.splice(0, 1)
      cohortToBeReplaced.push({
        subscriptionDate: userSubscriptionDate,
        course_id: course_id,
        cohort_id: nextCohortId,
      })
      userRef.update({
        cohorts: [...cohortToBeReplaced, ...cohortsToKeep],
      })
      updateCohortIds(userRef)
    })
  })

async function userCompletedCourse(userId, courseId) {
  return await db
    .collection('lessons_submissions')
    .where('user_id', '==', userId)
    .get()
    .then(async (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        return doc.data().lesson
      })
      const courseLessons = await db
        .collection('courses')
        .doc(courseId)
        .get()
        .then(async (courses) => {
          const course = courses.data()
          return Object.keys(course.sections)
            .map((section) => {
              return course.sections[section].map((lesson) => {
                return lesson.file
              })
            })
            .flat()
        })
      function checkLessons(lesson) {
        return new Set(docs).has(lesson)
      }
      return courseLessons.every(checkLessons)
    })
}

async function updateCohortIds(userRef) {
  const user = (await userRef.get()).data()
  const userCohorts = user.cohorts.map((item) => item.cohort_id)
  userRef.set({ cohort_ids: userCohorts }, { merge: true })
}
