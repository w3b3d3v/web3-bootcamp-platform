import { db } from '../firebase/initFirebase.js'
import { collection, query, getDocs, addDoc } from 'firebase/firestore'

export async function getAllCohorts() {
  const q = query(collection(db, 'cohorts'))

  const querySnapshot = await getDocs(q)
  const list = []
  querySnapshot.forEach((doc) => {
    const startDate = new Date(doc.data().startDate?.toDate())
    const endDate = new Date(doc.data().endDate?.toDate())
    const kickoffStartTime = new Date(doc.data().kickoffStartTime?.toDate())
    const kickoffEndTime = new Date(doc.data().kickoffEndTime?.toDate())
    const courseId = doc.data()?.course_id /*doc.data().course.path.split('/').pop()*/
    list.push({
      id: doc.id,
      courseId: courseId,
      startDate: startDate,
      endDate: endDate,
      kickoffStartTime: kickoffStartTime,
      kickoffEndTime: kickoffEndTime,
    })
  })
  return list
}

export async function createCohortInFirestore(cohortData) {
  await addDoc(collection(db, 'cohorts'), { ...cohortData })
}
