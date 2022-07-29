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

export const filterUserLessons = (lessonsSubmitted, user_id) => {
  return lessonsSubmitted.filter((item) => item.user === user_id)
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
