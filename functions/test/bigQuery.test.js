const { getMissingNftsBigquery } = require('../bigQuery');

jest.mock('@google-cloud/bigquery', () => {
  class BigQueryMock {
    createQueryJob(options) {
      return Promise.resolve([{
        getQueryResults: jest.fn().mockResolvedValue('mock results')
      }]);
    }
  }

  return {
    BigQuery: BigQueryMock
  };
});

describe('getMissingNftsBigquery', () => {
  test('should return query results', async () => {
    const results = await getMissingNftsBigquery();
    expect(results).toEqual('mock results');
  });
});
