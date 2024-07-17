import { db } from '../firebase/initFirebase.js'
import { collection, query, getDocs, where, doc, getDoc } from 'firebase/firestore'

export async function getLessonsSubmittedBySection(user_id) {
  const q = query(collection(db, 'lessons_submissions'), where('user_id', '==', user_id))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((d) => d.data())
}

export const getLessonsByCourse = (course) => {
  const list = []
  const lessonsBySection = {}
  Object.keys(course?.sections)
    .sort()
    .map((section) => {
      course?.sections[section].map((lesson) => {
        lessonsBySection[section] = lessonsBySection[section] ? lessonsBySection[section] + 1 : 1
        list.push({ section, ...lesson })
      })
    })
  return { list, lessonsBySection }
}

export const filterUserLessonsByCohort = (lessonsSubmitted, user_id, cohort) => {
  return lessonsSubmitted.filter(
    (item) => item?.user_id === user_id && item?.cohort_id === cohort?.id
  )
}

export const completedResult = (lessonsBySection, completedSectionNumbers) => {
  return Object.keys(lessonsBySection).map((section) => {
    return {
      section,
      completed: completedSectionNumbers[section] ? completedSectionNumbers[section] : 0,
      total: lessonsBySection[section],
    }
  })
}
export async function getLessonsSubmissions(user_id, cohort_id) {
  if (!user_id || !cohort_id) return []
  return await getLessonsByUserAndCohort(user_id, cohort_id)
}

async function getLessonsByUserAndCohort(user_id, cohort_id) {
  const q = query(
    collection(db, 'lessons_submissions'),
    where('user_id', '==', user_id),
    where('cohort_id', '==', cohort_id)
  )
  const querySnapshot = await getDocs(q)
  const list = []
  querySnapshot.forEach((doc) => {
    list.push({
      ...doc.data(),
      user: doc.data()?.user?.id,
      cohort: doc.data()?.cohort?.id,
    })
  })
  return list
}

export async function lastLesson() {
  console.log('chamou!')
  const q = query(
    collection(db, 'lessons_submissions'),
    where('lesson', '==', 'Lesson_2_Finalize_Celebrate.md')
  )
  const docs = await getDocs(q)
  let result = []
  docs.forEach((d) => {
    let lesson_data = d.data()
    lesson_data.id = d.id
    const docUser = doc(db, 'users', lesson_data.user_id)
    lesson_data.user = getDoc(docUser).then((y) => (lesson_data.user = y.data()))
    result.push(lesson_data)
  })

  await Promise.all(result.map((r) => r.user))
  return result
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
