const admin = require('firebase-admin')
var serviceAccount = require('./firebase/prod-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()
let userNumber = 0
let cohortId = 'DIdCT7JYteDCs2LXFOVI'

const cohortRef = db.collection('cohorts').doc(cohortId)

db.collection('users')
  .where('uid', '!=', '08YVfe9gwfTkY9og0UXpXA7aVlp2')
  .get()
  .then((snapshot) => {
    snapshot.forEach((document) => {
      const userRef = db.collection('users').doc(document.id)
      const data = document.data()
      if (data.cohorts?.length > 0) {
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
