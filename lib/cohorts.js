import { db } from '../firebase/initFirebase.js'
import { collection, query, getDocs } from 'firebase/firestore'

export async function getAllCohorts() {
  const q = query(collection(db, 'cohorts'))

  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      courseId: doc.data()?.course_id,
      startDate: new Date(doc.data().startDate?.toDate()),
      endDate: new Date(doc.data().endDate?.toDate()),
      kickoffStartTime: new Date(doc.data().kickoffStartTime?.toDate()),
      kickoffEndTime: new Date(doc.data().kickoffEndTime?.toDate()),
      name: doc.data().name,
    }
  })
}

const userIsRegisteredInPreviousCohort = (user, cohorts, course) => {
  const userCohort = user?.cohorts?.find((userCohort) => userCohort?.course_id == course.id)
  return userCohort ? cohorts?.find((cohort) => cohort?.id === userCohort?.cohort_id) : null
}

export const getCurrentCohort = (user, cohorts, course, currentDate) => {
  const sortCohortsByDate = cohorts.sort((a, b) => {
    return new Date(a.endDate) - new Date(b.endDate)
  })
  return (
    userIsRegisteredInPreviousCohort(user, cohorts, course) ??
    sortCohortsByDate.find((cohort) => {
      return (
        cohort.courseId == course.id &&
        ((cohort.startDate <= new Date(currentDate) && cohort.endDate >= new Date(currentDate)) ||
          cohort.startDate >= new Date(currentDate))
      )
    })
  )
}
