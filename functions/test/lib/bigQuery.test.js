const { getQueryResults } = require('../../lib/bigQuery');
const nock = require('nock');

describe('getQueryResults', () => {
    jest.setTimeout(30000);
    beforeEach(() => {
      nock('https://bigquery.googleapis.com')
        .post('/bigquery/v2/projects/your-project-id/queries')
        .reply(200, {
          message : {
            response: "success"
          },
        });
    });
  
    afterEach(() => {
      nock.cleanAll();
    });
  
    it('should return query results', async () => {
      const query = 'SELECT * FROM your_table';
      const results = await getQueryResults(query);
      expect(results).toEqual({message : {
        response: "success"
      }});
    });
  });