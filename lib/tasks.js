import { collection, query, where, getDocs, limit } from 'firebase/firestore'
import { db } from '../firebase/initFirebase.js'

export async function getAllTasks() {
  let ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 10)
  ninetyDaysAgo = ninetyDaysAgo.toISOString()

  const q = query(collection(db, 'tasks'), where('createdAt', '<=', ninetyDaysAgo), limit(100))

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })
}
