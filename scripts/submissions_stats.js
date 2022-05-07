// bunch of functions to get lesson submission stats

const admin = require('firebase-admin')
var serviceAccount = require('../firebase/prod-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const lessonsStatus = async () => {
  db.collection('lessons_submissions')
    .get()
    .then((snapshot) => {
      let sub = {}

      snapshot.forEach((document) => {
        const data = document.data()

        if (!sub[data.section]) {
          sub[data.section] = {}
        }
        sub[data.section][data.user_id] = true
      })

      Object.keys(sub)
        .sort()
        .forEach((k) => {
          console.log(`${k} => ${Object.keys(sub[k]).length}`)
        })
    })
}

// lessonsStatus()

const fixCreatedAt = async () => {
  db.collection('lessons_submissions')
    .get()
    .then((snapshot) => {
      let sub = {}
      snapshot.forEach((document) => {
        if (!document.data().createdAt) {
          console.log(document)
          console.log(document.createTime._seconds)
          console.log(new Date(document.createTime._seconds * 1000))
          document._ref.set(
            {
              createdAt: new Date(document.createTime._seconds * 1000),
            },
            { merge: true }
          )
        }
      })
    })
}

fixCreatedAt()
