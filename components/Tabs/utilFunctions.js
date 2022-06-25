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
export const checkLessons = (course, lessonsSubmitted, cohort, user_id) => {
  const { list, courseSectionsLength } = getLessons(course)
  const userLessons = lessonsSubmitted.filter((item) => item.user == user_id)
  const userLessonsSubmittedInCurrentCohort = userLessons.filter(
    (item) => item.cohort === cohort?.id
  )
  const sectionsCompleted = userLessonsSubmittedInCurrentCohort
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

export const checkSectionCompleted = (section, course, lessonsSubmitted, cohort, user_id) => {
  if (
    (checkLessons(course, lessonsSubmitted, cohort) && section, lessonsSubmitted, cohort, user_id)
  ) {
    return checkLessons(course, lessonsSubmitted, cohort, user_id)
      .map((item) => item?.section == section && item?.completed == item?.total)
      .filter(Boolean)[0]
  }
}
export const checkCurrentSection = (section, course, lessonsSubmitted, cohort, user_id) => {
  if (checkLessons(course, lessonsSubmitted, cohort, user_id)) {
    if (
      checkLessons(course, lessonsSubmitted, cohort, user_id).find(
        (item) => item.completed < item.total
      )?.section == section
    )
      return 'bg-violet-600'
  }
}
