import { getCourse } from '../../lib/course'
import { getLessonsByCourse, getLessonsSubmittedBySection } from '../../lib/lessons'
import { checkSectionsCompleted, lessonsCompletedBySection } from '../../lib/sections'

let user_id = 'tFOYKWIm6OMlKHtmxarRfVY77W63'

export async function fetchDB() {
  const course = await getCourse("course", 'Solidity_And_Smart_Contracts')
  const list = getLessonsByCourse(course).list
  const lessonsBySection = getLessonsByCourse(course).lessonsBySection
  const lessons = await getLessonsSubmittedBySection(user_id)
  const sectionsCompleted = await checkSectionsCompleted(lessons, list)
  const userLessonsCompletedBySection = lessonsCompletedBySection(sectionsCompleted)
  return {
    course,
    lessons,
    list,
    lessonsBySection,
    sectionsCompleted,
    userLessonsCompletedBySection,
  }
}
