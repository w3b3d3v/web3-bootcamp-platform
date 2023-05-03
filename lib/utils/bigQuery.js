const getQueryResults = async function (query) {
  const { BigQuery } = require('@google-cloud/bigquery')
  const bigquery = new BigQuery()

  const options = {
    query: query,
    location: 'US',
  }

  const [job] = await bigquery.createQueryJob(options)

  return await job.getQueryResults()
}

exports.getQueryResults = getQueryResults
