const { getQueryResults } = require('../lib/utils/bigQuery')

async function usersBySection() {
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

  const result = structureData(rows);
  const promises = result.map(async item => {
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

function structureData(rows) {
  result = rows.reduce((acc, row) => {
    const { course_id, section, students, photoUrls } = row
    const courseIndex = acc.findIndex(item => item.course_id === course_id)
      if (courseIndex === -1) {
        acc.push({
          course_id,
          sections: [{
            section: section,
            students,
            photoUrls
          }]
        })
      } else {
        const sectionIndex = acc[courseIndex].sections.findIndex(item => item.section_name === section)
        if (sectionIndex === -1) {
          acc[courseIndex].sections.push({
            section_name: section,
            students,
            photoUrls
          })
        } else {
          acc[courseIndex].sections[sectionIndex].students += students
          acc[courseIndex].sections[sectionIndex].photoUrls = acc[courseIndex].sections[sectionIndex].photoUrls.concat(photoUrls)
        }
      }
    return acc
  }, [])
  return result;
}

module.exports = { usersBySection, storeUsersPerCohort }
