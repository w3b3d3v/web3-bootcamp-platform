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

async function usersIdsCompletedBootcamp(db) {
  const lessons = (
    await db
      .collection('lessons_submissions')
      .where('lesson', '==', 'Lesson_2_Finalize_Celebrate.md')
      .get()
  ).docs
  return lessons.map((l) => l.data().user_id)
}

async function usersToSend2ndChance(db, cohort_id) {
  const usersIds = await usersIdsCompletedBootcamp(db)
  return (await db.collection('users').where('cohort_ids', 'array-contains', cohort_id).get()).docs
    .map((d) => d.data())
    .filter((user) => !usersIds.includes(user.uid))
}

module.exports = { userCompletedCourse, usersIdsCompletedBootcamp, usersToSend2ndChance }
