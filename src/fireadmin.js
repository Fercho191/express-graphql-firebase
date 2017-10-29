const admin = require('firebase-admin')

let serviceAccount = require('C:/laragon/www/secretKeyFirebase.json')

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://graph-test-d2719.firebaseio.com/"
});

let firebaseAuth = firebase.auth();
let firebaseDB = firebase.database();

module.exports = firebaseDB