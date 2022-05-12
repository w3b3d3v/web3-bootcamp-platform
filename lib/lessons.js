import { db } from '../firebase/initFirebase.js'
import { collection, query, getDocs, where } from 'firebase/firestore'

export async function getLessonsSubmissions(user_id) {
  if (!user_id) return []
  return await getLessons(user_id)
}

async function getLessons(user_id) {
  const q = query(
    collection(db, 'lessons_submissions'),
    where('user_id', '==', user_id)
  )
  const querySnapshot = await getDocs(q)
  const list = []
  const promises = [querySnapshot].map(async (document, idx) => {
    if (document.docs.find((item) => item.data().user)) {
      list.push(
        document.docs.map((item) =>
          Object.assign({}, item.data(), {
            user: item.data()?.user?.id,
            cohort: item.data()?.cohort?.id,
          })
        )
      )
    }
  })
  await Promise.all(promises)
  return list.flat()
}

export async function lessonsStatus() {
  const q = query(collection(db, 'lessons_submissions'))
  const snapshot = await getDocs(q)

  let sub = {}

  snapshot.forEach((document) => {
    const data = document.data()

    if (!sub[data.section]) {
      sub[data.section] = {}
    }
    sub[data.section][data.user_id] = true
  })

  return Object.keys(sub)
    .sort()
    .map((k) => {
      return {
        session: k,
        submitted: Object.keys(sub[k]).length,
      }
    })
}
