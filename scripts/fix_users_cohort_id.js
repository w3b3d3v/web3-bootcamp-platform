const admin = require('firebase-admin')
var serviceAccount = require('../firebase/prod-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()
let userNumber = 0
let cohortId = 'DIdCT7JYteDCs2LXFOVI'

const cohortRef = db.collection('cohorts').doc(cohortId)

db.collection('users')
  .get()
  .then((snapshot) => {
    snapshot.forEach((document) => {
      const userRef = db.collection('users').doc(document.id)
      const data = document.data()
      if (data.cohorts[0] && !data.cohorts[0]?.cohort_id) {
        // if the first cohort is lacking cohort_id it is also lacking course_id
        console.log(`Atualizando usuário ${(userNumber += 1)}...`)
        const res = userRef.set(
          {
            cohorts: [
              {
                subscriptionDate: data.cohorts[0].subscriptionDate,
                id: data.cohorts[0].id,
                course_id: data.cohorts[0].id,
                cohort: cohortRef,
                cohort_id: cohortId,
              },
            ],
          },
          { merge: true }
        )
      }
    })
  })
async function changeUserCohort(user_id, course_id, db) {
  const nextCohort = await getNextCohort(db, course_id)
  const nextCohortID = (await db.collection('cohorts').where('name', '==', nextCohort.name).get())
    .docs[0].id
  const userRef = db.collection('users').doc(user_id)
  const user = (await userRef.get()).data()
  const cohortsToKeep = user.cohorts.filter((cohort) => cohort.course_id !== nextCohort.course_id)
  const cohortToBeReplaced = user.cohorts.filter((item) => item.course_id == nextCohort.course_id)
  const userSubscriptionDate = cohortToBeReplaced[0].subscriptionDate
  cohortToBeReplaced.splice(0, 1)
  cohortToBeReplaced.push({
    subscriptionDate: userSubscriptionDate,
    course_id: nextCohort.course_id,
    cohort_id: nextCohortID,
  })
  userRef.update({
    cohorts: [...cohortToBeReplaced, ...cohortsToKeep],
  })
  updateCohortIds(userRef)
}
