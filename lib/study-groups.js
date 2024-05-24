import { db } from '../firebase/initFirebase.js'
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore'

export async function getAllStudyGroups() {
  const q = query(collection(db, 'study_groups'), orderBy('index'))

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })
}