const { getQueryResults } = require('./lib/bigQuery')
const { db } = require('./lib/initDb')

// Function to get the presence data from BigQuery
async function usersByStudyGroup() {
  return getQueryResults(`
WITH max_section AS (
    SELECT sgp.discord_id, sgp.study_group_id, MAX(sgp.createdAt) AS last_presence
    FROM \`web3dev-bootcamp.web3dev_bootcamp.study_group_presence\` sgp
    GROUP BY sgp.discord_id, sgp.study_group_id
),
section_data AS (
    SELECT
      ms.study_group_id,
      COUNT(DISTINCT ms.discord_id) AS students,
      ARRAY_AGG(u.photoUrl IGNORE NULLS LIMIT 3) AS photoUrls
    FROM max_section ms
    JOIN \`web3dev-bootcamp.web3dev_bootcamp.users\` u ON u.discord_id = ms.discord_id
    GROUP BY ms.study_group_id
)
SELECT
    sg.id AS study_group_id,
    sd.students,
    sd.photoUrls
FROM \`web3dev-bootcamp.web3dev_bootcamp.study_groups\` sg
LEFT JOIN section_data sd ON sg.id = sd.study_group_id
ORDER BY sg.id;
  `)
}

// Function to store the presence data in Firestore
async function storeUsersPerStudyGroup(rows) {
  const promises = rows.map(async (item) => {
    const { study_group_id, students, photoUrls } = item
    const studyGroup = db.collection('study_groups').doc(study_group_id)
    await studyGroup.update({ analytics: { students, photoUrls } })
    return { study_group_id, result: 'updated' }
  })
  await Promise.all(promises)
}

module.exports = { usersByStudyGroup, storeUsersPerStudyGroup }