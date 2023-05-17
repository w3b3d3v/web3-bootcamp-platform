const { getQueryResults } = require('./lib/bigQuery')

async function usersBySection() {
  return getQueryResults(`
  WITH max_section AS (
    SELECT l.user_id, l.cohort_id, MAX(l.section) AS max_section
    FROM web3dev-development.web3dev_bootcamp.lesson_submissions l
    GROUP BY l.user_id, l.cohort_id
  ),
  section_data AS (
    SELECT
      c.course_id,
      m.max_section,
      COUNT(DISTINCT m.user_id) AS students,
      ARRAY_AGG(u.photoUrl IGNORE NULLS LIMIT 3) AS photoUrls
    FROM max_section m
    JOIN web3dev-development.web3dev_bootcamp.cohorts c ON c.id = m.cohort_id
    JOIN web3dev-development.web3dev_bootcamp.users u ON u.id = m.user_id
    GROUP BY c.course_id, m.max_section
  )
  SELECT
    course_id,
    (SELECT
      STRUCT(
        ARRAY_AGG(
          STRUCT(
            CAST(max_section AS STRING) AS section,
            students,
            photoUrls
          )
        ) AS sections
      )
     FROM section_data sd
     WHERE sd.course_id = cd.course_id
    ).sections AS sections
  FROM section_data cd
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
