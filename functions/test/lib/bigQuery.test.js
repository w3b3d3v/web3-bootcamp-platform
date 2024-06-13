const { getQueryResults } = require('../../lib/bigQuery')

describe('getQueryResults', function() {
  it('should return query results', async () => {
    const query = 'SELECT * FROM web3dev_bootcamp.users LIMIT 1'

    const mockResults = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ]

    jest.mock('@google-cloud/bigquery', () => ({
      BigQuery: jest.fn(() => ({
        createQueryJob: jest.fn().mockResolvedValue([{ getQueryResults: jest.fn().mockResolvedValue(mockResults) }]),
      })),
    }))

    const result = await getQueryResults(query)

    expect(result).toEqual(mockResults)
  }, 50000)
})