const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp();

exports.scheduledRetryMints = functions.pubsub.schedule('every 24 hours').onRun((context) => {
    const fetch = require('node-fetch');
     fetch('cloud function url here', {
       method: 'GET',
      }).then((response) => console.log(response)).catch(err => console.log(err));
 });