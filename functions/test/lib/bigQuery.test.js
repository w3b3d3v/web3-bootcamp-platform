const { getQueryResults } = require('../../lib/bigQuery');
let record = require('../record');

require('dotenv').config()

describe('getQueryResults', function() {
  var recorder = record('bigQuery')
  beforeAll(recorder.before);

  it('should return query results', async () => {
    const query = 'SELECT * FROM web3dev_bootcamp.users LIMIT 1';
    const res = await getQueryResults(query);
    expect(res).toEqual([[{"bio": "", "blockchainExp": null, "builder": [], "cohorts": [], "createdAt": {"value": "2022-05-01T00:00:00.000Z"}, "devExp": null, "discord": null, "discord_id": null, "email": "alan.franzin2011@gmail.com", "github": null, "id": "23WEoArqzRf4ORh4cdvadaVsYtj1", "linkedin": null, "name": null, "personalWebsite": null, "photoUrl": null, "referred_by": null, "technologies": [], "twitter": null, "wallet": null}]]);
  }, 50000)
  
  afterAll(recorder.after);
})
