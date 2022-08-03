import { db } from '../firebase/initFirebase.js'
import { collection, query, getDocs } from 'firebase/firestore'

export async function getAllCohorts() {
  const q = query(collection(db, 'cohorts'))

  const querySnapshot = await getDocs(q)
  const list = []
  querySnapshot.forEach((doc) => {
    list.push({
      id: doc.id,
      courseId: doc.data()?.course_id,
      startDate: new Date(doc.data().startDate?.toDate()),
      endDate: new Date(doc.data().endDate?.toDate()),
      kickoffStartTime: new Date(doc.data().kickoffStartTime?.toDate()),
      kickoffEndTime: new Date(doc.data().kickoffEndTime?.toDate()),
      name: doc.data().name,
    })
  })
  return list
}
