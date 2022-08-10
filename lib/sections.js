export const checkSectionsCompleted = (userLessons, list) => {
  return userLessons
    .map((lesson) => {
      return list.filter((item) => item.section == lesson.section && item.file == lesson.lesson)
    })
    .filter(Boolean)
    .flat()
}

export const lessonsCompletedBySection = (sectionsCompleted) => {
  return sectionsCompleted
    .map((item) => item.section)
    .reduce(function (obj, currSection) {
      obj[currSection] = ++obj[currSection] || 1
      return obj
    }, {})
}
