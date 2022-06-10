async function userCompletedCourse(userId, courseId, db) {
  return await db
    .collection('lessons_submissions')
    .where('user_id', '==', userId)
    .get()
    .then(async (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        return doc.data().lesson
      })
      const courseLessons = await db
        .collection('courses')
        .doc(courseId)
        .get()
        .then(async (courses) => {
          const course = courses.data()
          return Object.keys(course.sections)
            .map((section) => {
              return course.sections[section].map((lesson) => {
                return lesson.file
              })
            })
            .flat()
        })
      function checkLessons(lesson) {
        return new Set(docs).has(lesson)
      }
      return courseLessons.every(checkLessons)
    })
}

module.exports = { userCompletedCourse }
