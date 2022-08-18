import { getLessonsByCourse, filterUserLessonsByCohort, completedResult } from '../../lib/lessons'
import { checkSectionsCompleted, lessonsCompletedBySection } from '../../lib/sections'

export const checkLessonsSubmitted = (course, lessonsSubmitted, user_id, cohort) => {
  const { list, lessonsBySection } = getLessonsByCourse(course)

  const userLessons = filterUserLessonsByCohort(lessonsSubmitted, user_id, cohort)

  const sectionsCompleted = checkSectionsCompleted(userLessons, list)

  const completedSectionNumbers = lessonsCompletedBySection(sectionsCompleted)

  return completedResult(lessonsBySection, completedSectionNumbers)
}

export const checkSections = (course, lessonsSubmitted, section, user_id, cohort) => {
  const completedLessonsBySection = checkLessonsSubmitted(course, lessonsSubmitted, user_id, cohort)
  const isSectionCompleted = checkSectionIsCompleted(completedLessonsBySection, section)
  const currentSection =
    completedLessonsBySection.find((item) => item.completed < item.total)?.section == section
  return { isSectionCompleted, currentSection }
}

export const checkSectionIsCompleted = (completedLessonsBySection, section) => {
  return completedLessonsBySection
    .map((item) => item?.section == section && item?.completed == item?.total)
    .filter(Boolean)[0]
}

export const colorTab = (isSectionCompleted, currentSection) => {
  if (isSectionCompleted) {
    return 'bg-green-500'
  } else if (currentSection) {
    return 'bg-violet-600'
  } else {
    return ''
  }
}
