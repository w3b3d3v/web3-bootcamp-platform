const { db } = require('./initDb')

async function userCompletedCourse(userId, courseId) {
  return await db
    .collection('lessons_submissions')
    .where('user_id', '==', userId)
    .get()
    .then(async (snapshot) => {
      const docs = snapshot.docs.map((doc) => doc.data().lesson)
      const courseLessons = await db
        .collection('courses')
        .doc(courseId)
        .get()
        .then(async (courses) => {
          const course = courses.data()
          // Find the first language that has sections
          const language = Object.keys(course.metadata).find(
            (lang) => course.metadata[lang].sections
          )
          if (!language) {
            throw new Error('No sections found in any language')
          }
          return Object.values(course.metadata[language].sections).flatMap((section) =>
            section.map((lesson) => lesson.file)
          )
        })
      const checkLessons = (lesson) => new Set(docs).has(lesson)
      return courseLessons.every(checkLessons)
    })
}

async function usersIdsCompletedBootcamp() {
  const lessons = (
    await db
      .collection('lessons_submissions')
      .where('lesson', '==', 'Lesson_2_Finalize_Celebrate.md')
      .get()
  ).docs
  return lessons.map((l) => l.data().user_id)
}

async function usersToSend2ndChance(cohort_id) {
  const usersIds = await usersIdsCompletedBootcamp()
  return (await db.collection('users').where('cohort_ids', 'array-contains', cohort_id).get()).docs
    .map((d) => d.data())
    .filter((user) => !usersIds.includes(user.uid))
}

module.exports = { userCompletedCourse, usersIdsCompletedBootcamp, usersToSend2ndChance }
