const pioneiros_id = 'DIdCT7JYteDCs2LXFOVI'
const exploradores_id = 'TMVZpb9yEg6zUbd8sY79'
const eternos_id = '4w8ZYXwvnhzifFwPjyEo'
const contractAddress = '0xa68580d4E41925C20aF20dBA9B4Db17A79842F19'

const nft_list = require('./nft_minted.json')

async function nft_mints_collection(db) {
  const pioneirosCohort = (await db.collection('cohorts').doc(pioneiros_id).get()).data()
  const exploradoresCohort = (await db.collection('cohorts').doc(exploradores_id).get()).data()
  const eternosCohort = (await db.collection('cohorts').doc(eternos_id).get()).data()

  const course = (await db.collection('courses').doc('Solidity_And_Smart_Contracts').get()).data()

  function getCohort(cohort_id) {
    if (cohort_id === pioneiros_id) return pioneirosCohort
    if (cohort_id === exploradores_id) return exploradoresCohort
    return eternosCohort
  }

  nft_list.map(async (item) => {
    let cohort = getCohort(item.cohort_id)
    const user = (await db.collection('users').doc(item.user_id).get()).data()
    const lessons = await db
      .collection('lessons_submissions')
      .where('user_id', '==', item.user_id)
      .where('lesson', '==', 'Lesson_2_Finalize_Celebrate.md')
      .get()
    const lesson = lessons.docs.map((item) => item.data())[0]
    try {
      if (lesson?.createdAt > cohort.endDate) cohort = eternosCohort
      const params = {
        cohort,
        course_title: course.nft_title,
        wallet_address: user?.wallet,
        nft_contract: contractAddress,
        nft_id: +item.number,
        user,
        user_id: lesson?.user_id,
        cohort_id: lesson?.cohort_id,
        cohort_name: cohort.name,
        created_at: lesson?.createdAt,
      }
      console.log('added ' + params)
      db.collection('nft_mints').add(params)
    } catch (error) {
      console.log(error)
    }
  })
}

module.exports = { nft_mints_collection }
