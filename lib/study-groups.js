import { db } from '../firebase/initFirebase.js'
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore'

export async function getAllStudyGroups() {
  const q = query(collection(db, 'study_groups'), orderBy('index'));

  const querySnapshot = await getDocs(q)
  const docs = querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      ...data,
      id: doc.id,
      scheduled_at: data.scheduled_at.toDate().toISOString(), // Convert Timestamp to Date
    }
  })
  return docs 
}