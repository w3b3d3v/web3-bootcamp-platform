const firebase = require('firebase-admin')
const admin = firebase.initializeApp()
const db = admin.firestore()

exports.db = db
exports.firebase = firebase
