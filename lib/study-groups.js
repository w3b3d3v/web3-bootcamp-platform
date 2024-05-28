import { db } from '../firebase/initFirebase.js'
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore'

export async function getAllStudyGroups() {
  const q = query(collection(db, 'study_groups'), orderBy('index'))

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const data = doc.data()
    // Convert Firestore Timestamp to ISO string if it exists
    if (data.scheduled_at && data.scheduled_at.toDate) {
      data.scheduled_at = data.scheduled_at.toDate().toISOString()
    }
    return { ...data, id: doc.id }
  })
}