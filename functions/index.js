const functions = require('firebase-functions');

const app = require('express')();
const firebase = require('firebase');

// import custom modules
const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream
} = require('./handlers/screams');
const {
  signUp,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser
} = require('./handlers/users');

const FBAuth = require('./util/FbAuth');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Scream Routes
// get the screams from the database
app.get('/screams', getAllScreams);
/**
 * Create screams function
 */
app.post('/scream', FBAuth, postOneScream);
// get a specific scream
app.get('/scream/:screamId', getScream);
// add comment route
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);

/**
 * user Routes
 * signup route
 */
app.post('/signup', signUp);
/**
 * login route
 */
app.post('/login', login);

/**
 * upload image route
 */
app.post('/user/image', FBAuth, uploadImage);
/**
 * user details rout
 */
app.post('/user', FBAuth, addUserDetails);
// Get user Details
app.get('/user', FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);
