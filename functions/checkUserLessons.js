async function userCompletedCourse(userId, courseId, db) {
  let userLessonsSent;
  let courseTotalLessons;
  await db.collection('lessons_submissions').where('user_id', '==', userId).get().then(async snapshot => {
    const docs = []
    snapshot.forEach(doc => {
      const section = doc.data().section
      const lesson = doc.data().lesson
      return docs.push({ section, lesson })
    })
    userLessonsSent = docs.length;
    await db.collection('courses').doc(courseId).get().then(async snapshot => {
      const course = snapshot.data()
      const sections = course.sections
      return courseTotalLessons = Object.values(sections).flat().length
    })
  })
  return userLessonsSent === courseTotalLessons
}