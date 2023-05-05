const { getQueryResults } = require('../lib/utils/bigQuery')

async function usersBySection() {
  return getQueryResults(`
    WITH sections AS (select 
    c.course_id, section, 
    count(distinct l.user_id) students,
    array_agg(u.photoUrl IGNORE NULLS limit 5) photoUrls
    from web3dev-bootcamp.web3dev_bootcamp.lesson_submissions l 
    join web3dev-bootcamp.web3dev_bootcamp.cohorts c on c.id = l.cohort_id
    join web3dev-bootcamp.web3dev_bootcamp.users u on u.id = l.user_id
    group by 1,2
    order by 1,2)
    select course_id, array_agg(struct(section, students, photoUrls)) as sections
    from sections
    group by 1
  `)
}

async function storeUsersPerCohort(db, rows) {
  const analyticsRef = db.collection('builds_analytics')
  const promises = rows.map(async item => {
    const { course_id, sections } = item
    const querySnapshot = await analyticsRef.where('course_id', '==', course_id).get()
    if (querySnapshot.empty) {
      const documentRef = analyticsRef.doc()
      await documentRef.set({ course_id, sections })
      return { course_id, result: 'created' }
    } 
    
    else {
      const documentRef = querySnapshot.docs[0].ref
      await documentRef.update({ sections })
      return { course_id, result: 'updated' }
    }
  })
  await Promise.all(promises)
}


module.exports = { usersBySection, storeUsersPerCohort }
