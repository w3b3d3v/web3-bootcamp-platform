const { getQueryResults } = require('./lib/bigQuery')
const { db } = require('./lib/initDb')

async function usersBySection() {
  return getQueryResults(`
WITH max_section AS (
    SELECT l.user_id, c.course_id, MAX(l.section) AS max_section
    FROM web3dev_bootcamp.lesson_submissions l
    JOIN web3dev_bootcamp.cohorts c ON c.id = l.cohort_id
    GROUP BY l.user_id, c.course_id
  ),
  section_data AS (
    SELECT
      m.course_id,
      m.max_section,
      COUNT(DISTINCT m.user_id) AS students,
      ARRAY_AGG(u.photoUrl IGNORE NULLS LIMIT 3) AS photoUrls
    FROM max_section m
    JOIN web3dev_bootcamp.users u ON u.id = m.user_id
    GROUP BY m.course_id, m.max_section
  )
  SELECT
    course_id,
    (SELECT
        ARRAY_AGG(
          STRUCT(
            CAST(max_section AS STRING) AS section,
            students,
            photoUrls
          )
        ) AS sections
     FROM section_data sd
     WHERE sd.course_id = cd.course_id
    ) AS sections
  FROM section_data cd
  GROUP BY course_id
  ORDER BY course_id;  
`)
}

async function storeUsersPerCohort(rows) {
  const promises = rows.map(async (item) => {
    const { course_id, sections } = item
    const course = db.collection('courses').doc(course_id)
    await course.update({ analytics: sections })
    return { course_id, result: 'updated' }
  })
  await Promise.all(promises)
}

module.exports = { usersBySection, storeUsersPerCohort }
