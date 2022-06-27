export const getLessons = (course) => {
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

export const checkLessonsSubmitted = (course, lessonsSubmitted, cohort, user_id) => {
  const { list, lessonsBySection } = getLessons(course)
  const userLessons = filterUserLessons()

  const sectionsCompleted = checkSectionsCompleted()

  const completedSectionNumbers = reduceSectionsCompleted()

  const completed = completedResult()

  function filterUserLessons() {
    return lessonsSubmitted.filter((item) => item.user === user_id)
  }

  function checkSectionsCompleted() {
    return userLessons
      .map((lesson) => {
        return list.map(
          (item) => item.section == lesson.section && item.file == lesson.lesson && item
        )
      })
      .map((item) => item.filter(Boolean))
      .flat()
  }

  function reduceSectionsCompleted() {
    return sectionsCompleted
      .map((item) => item.section)
      .reduce(function (obj, currSection) {
        obj[currSection] = ++obj[currSection] || 1
        return obj
      }, {})
  }

  function completedResult() {
    return Object.keys(lessonsBySection).map((section) => {
      return {
        section,
        completed: completedSectionNumbers[section] ? completedSectionNumbers[section] : 0,
        total: lessonsBySection[section],
      }
    })
  }

  return completed
}

export const checkSections = (course, lessonsSubmitted, cohort, section, user_id) => {
  const lessons = checkLessonsSubmitted(course, lessonsSubmitted, cohort, user_id)
  const completedSection = lessons
    .map((item) => item?.section == section && item?.completed == item?.total)
    .filter(Boolean)[0]
  const currentSection = lessons.find((item) => item.completed < item.total).section == section
  if (completedSection) return 'bg-green-500'
  if (currentSection) return 'bg-violet-600'
  return ''
}
