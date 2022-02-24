import { db } from '../firebase/initFirebase.js'
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

export async function getAllCourses() {
  const q = query(collection(db, 'courses'), orderBy('active', 'desc'))

  const querySnapshot = await getDocs(q)
  const list = []
  querySnapshot.forEach((doc) => {
    list.push({id: doc.id, ...doc.data()})
  })

  return list;
}
