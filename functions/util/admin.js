const admin = require('firebase-admin');

/**
 * Must add account credential for local dev
 * then pass the service account to admin.initializeApp() function
 */
const serviceAccount = require('../social-apes-firebase-adminsdk-4yqq0-cbc0603a80.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://social-apes.firebaseio.com',
  storageBucket: 'social-apes.appspot.com'
});

const db = admin.firestore();

module.exports = {
  admin,
  db
};
