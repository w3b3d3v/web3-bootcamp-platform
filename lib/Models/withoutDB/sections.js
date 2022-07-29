export const checkSectionsCompleted = (userLessons, list) => {
  return userLessons
    .map((lesson) => {
      return list.map(
        (item) => item.section == lesson.section && item.file == lesson.lesson && item
      )
    })
    .map((item) => item.filter(Boolean))
    .flat()
}

export const reduceSectionsCompleted = (sectionsCompleted) => {
  return sectionsCompleted
    .map((item) => item.section)
    .reduce(function (obj, currSection) {
      obj[currSection] = ++obj[currSection] || 1
      return obj
    }, {})
}
