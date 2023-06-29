let nock = require('nock');
var path = require('path');
var fs = require('fs');

module.exports = function (name, options) {
  // options tells us where to store fixtures
  options = options || {};
  let test_folder = options.test_folder || 'test';
  let fixtures_folder = options.fixtures_folder || 'fixtures';
  let filename = name + '.js';
  let fp = path.join(test_folder, fixtures_folder, filename);
  let has_fixtures = !!process.env.NOCK_RECORD; // NOCK_RECORD var can be used to force a new recording
  let hide = options.hide || {};

  return {
    // starts recording or ensure fixtures exist
    before: function() {
      if(!has_fixtures) try {
        let content = fs.readFileSync(fp, 'utf8')
        for (const key in hide) {
          let replacer = new RegExp(key, 'g');
          content = content.replace(replacer, hide[key]);
        }
        fs.writeFileSync(fp + '.tmp.js', content);
        require('../' + fp + '.tmp.js');
        fs.unlinkSync(fp + '.tmp.js');
        has_fixtures = true;
      } catch(e) {
        console.log(e);
        nock.recorder.rec({
          dont_print: true
        });
      } else {
        has_fixtures = false;
        nock.recorder.rec({
          dont_print: true
        });
      }
    },
    // saves recording if fixtures not exist
    after: function(done) {
      if (!has_fixtures) {
        var fixtures = nock.recorder.play();

        // Modify the recorded fixture to match the provided example
        var modifiedFixtures = fixtures.map(function(fixture) {
          var body = JSON.parse(fixture.body);
          body.jobReference.jobId = '{job_id}'; // Ignore job_id during playback
          return {
            method: fixture.method,
            path: fixture.path,
            body: JSON.stringify(body),
            status: fixture.status,
            headers: fixture.headers
          };
        });
        var text = "var nock = require('nock');\n" + + JSON.stringify(modifiedFixtures, null, 2);
        for (const key in hide) {
          var replacer = new RegExp(hide[key], 'g')
          text = text.replace(replacer, key);
        }

        fs.writeFile(fp, text, done);
      } else {
        done();
      }
    }
  }
}