export const getLessons = (course) => {
  const list = []
  const courseSectionsLength = {}
  Object.keys(course?.sections)
    .sort()
    .map((section) => {
      course?.sections[section].map((lesson) => {
        courseSectionsLength[section] = courseSectionsLength[section]
          ? courseSectionsLength[section] + 1
          : 1
        list.push({ section, ...lesson })
      })
    })
  return { list, courseSectionsLength }
}

export const checkLessonsSubmitted = (course, lessonsSubmitted, cohort, user_id) => {
  const { list, courseSectionsLength } = getLessons(course)
  const userLessons = lessonsSubmitted.filter((item) => item.user === user_id)

  const sectionsCompleted = userLessons
    .map((lesson) => {
      return list.map(
        (item) => item.section == lesson.section && item.file == lesson.lesson && item
      )
    })
    .map((item) => item.filter(Boolean))
    .flat()
  const sectionsCompletedInCurrentCohort = sectionsCompleted
    .map((item) => item.section)
    .reduce(function (obj, b) {
      obj[b] = ++obj[b] || 1
      return obj
    }, {})
  const sections = Object.keys(courseSectionsLength)
  const completed = sections.map((section) => {
    return {
      section,
      completed: sectionsCompletedInCurrentCohort[section]
        ? sectionsCompletedInCurrentCohort[section]
        : 0,
      total: courseSectionsLength[section],
    }
  })
  return completed
}

export const checkSections = (course, lessonsSubmitted, cohort, section, user_id) => {
  const lessons = checkLessonsSubmitted(course, lessonsSubmitted, cohort, user_id)
  const completedSection = lessons
    .map((item) => item?.section == section && item?.completed == item?.total)
    .filter(Boolean)[0]
  if (completedSection) return 'bg-green-500'
  if (lessons.find((item) => item.completed < item.total).section == section) return 'bg-violet-600'
  return ''
}