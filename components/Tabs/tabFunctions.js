import {
  completedResult,
  filterUserLessons,
  getLessonsByCourse,
} from '../../lib/Models/withoutDB/lessons'
import {
  checkSectionsCompleted,
  reduceSectionsCompleted,
} from '../../lib/Models/withoutDB/sections'

export const checkLessonsSubmitted = (course, lessonsSubmitted, user_id) => {
  const { list, lessonsBySection } = getLessonsByCourse(course)

  const userLessons = filterUserLessons(lessonsSubmitted, user_id)

  const sectionsCompleted = checkSectionsCompleted(userLessons, list)

  const completedSectionNumbers = reduceSectionsCompleted(sectionsCompleted)

  return completedResult(lessonsBySection, completedSectionNumbers)
}

export const checkSections = (course, lessonsSubmitted, section, user_id) => {
  const completedLessonsBySection = checkLessonsSubmitted(course, lessonsSubmitted, user_id)
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
