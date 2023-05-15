const { getQueryResults } = require('./lib/bigQuery')

async function usersBySection() {
  return getQueryResults(`
  WITH sections AS (
    SELECT
      c.course_id,
      section,
      COUNT(l.user_id) AS students,
      ARRAY_AGG(u.photoUrl IGNORE NULLS LIMIT 3) AS photoUrls
    FROM web3dev-bootcamp.web3dev_bootcamp.lesson_submissions l
    JOIN web3dev-bootcamp.web3dev_bootcamp.cohorts c ON c.id = l.cohort_id
    JOIN web3dev-bootcamp.web3dev_bootcamp.users u ON u.id = l.user_id
    GROUP BY 1, 2
  )
  SELECT
    course_id,
    STRUCT(
      ARRAY_AGG(
        STRUCT(
          section,
          students,
          photoUrls
        ) ORDER BY section
      )
    ) AS sections
  FROM sections
  GROUP BY course_id
  ORDER BY course_id;
  `)
}

async function storeUsersPerCohort(db, rows) {
  const analyticsRef = db.collection('builds_analytics')
  const promises = rows.map(async (item) => {
    const { course_id, sections } = item
    const querySnapshot = await analyticsRef.where('course_id', '==', course_id).get()
    if (querySnapshot.empty) {
      const documentRef = analyticsRef.doc()
      await documentRef.set({ course_id, sections })
      return { course_id, result: 'created' }
    } else {
      const documentRef = querySnapshot.docs[0].ref
      await documentRef.update({ sections })
      return { course_id, result: 'updated' }
    }
  })
  await Promise.all(promises)
}

module.exports = { usersBySection, storeUsersPerCohort }
