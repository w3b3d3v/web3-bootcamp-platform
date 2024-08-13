const getQueryResults = require('./bigQuery').getQueryResults

exports.getMissingNfts = async function () {
  const query = `select DISTINCT c.course_id, l.cohort_id, l.user_id
    from web3dev_bootcamp.lesson_submissions l 
    join web3dev_bootcamp.cohorts c on c.id = l.cohort_id
    join web3dev_bootcamp.cohorts c2 on c.course_id = c2.course_id 
    join web3dev_bootcamp.users u on u.id = l.user_id
    left join web3dev_bootcamp.nft_mints n on n.user_id = l.user_id and (n.cohort_id = l.cohort_id or n.cohort_id = c2.id)
      where (lesson = 'Lesson_2_Finalize_Celebrate.md' or lesson = 'Lesson_2_Ship_It.md' or lesson = 'Lesson_2_Finalize_And_Celebrate.md' or lesson = 'Lesson_2_Finishing_Touches_Contract.md' or lesson = 'Lesson_5_Course_Completed.md')
    and n.user_id is null
    and u.wallet is not null`
  return await getQueryResults(query)
}
