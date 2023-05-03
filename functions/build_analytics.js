const { getQueryResults } = require('../lib/utils/bigQuery')

async function usersPerSection() {
  const query = `select 
    c.course_id, section, 
    count(distinct l.user_id) students,
    array_agg(u.photoUrl IGNORE NULLS limit 5) photoUrls
    from web3dev-bootcamp.web3dev_bootcamp.lesson_submissions l 
    join web3dev-bootcamp.web3dev_bootcamp.cohorts c on c.id = l.cohort_id
    join web3dev-bootcamp.web3dev_bootcamp.users u on u.id = l.user_id
    group by 1,2
    order by 1,2`

  return getQueryResults(query)
}

async function storeUsersPerCohort(db, rows) {
  const analyticsRef = db.collection('builds_analytics')

  // Check if the collection exists
  const analyticsSnapshot = await analyticsRef.get()
  if (analyticsSnapshot.empty) {
    // Create the collection if it doesn't exist
    await analyticsRef.doc().set({})
  }

  // Loop through the rows and store them in the collection
  for (const row of rows) {
    const { course_id, section, students, photoUrls } = row
    const documentRef = analyticsRef.doc()
    const data = {
      course_id,
      section,
      students,
      photoUrls,
    }
    await documentRef.set(data)
  }
}

module.exports = { usersPerSection, storeUsersPerCohort }
