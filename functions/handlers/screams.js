// screams routes handlers
const { db } = require('../util/admin');
exports.getAllScreams = (req, res) => {
  db.collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          ...doc.data()
        });
      });
      return res.json(screams);
    })
    .catch(err => console.error(err));
};

//one scream handler
exports.postOneScream = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'body must not be Empty' });
  }
  // the scream object from front-end
  const newScream = {
    userHandle: req.user.handle,
    body: req.body.body,
    createdAt: new Date().toISOString()
  };

  db.collection('screams')
    .add(newScream)
    .then(doc => {
      return res.json({
        message: `document ${doc.id} has created successfully`
      });
    })
    .catch(error => {
      res.status(500).json({ error: 'some thing went wrong' });
      console.error(error);
    });
};

// get scream by screamId
exports.getScream = (req, res) => {
  let screamData = {};
  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' });
      }
      screamData = doc.data();
      screamData.screamId = doc.id;
      return db
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .where('screamId', '==', req.params.screamId)
        .get();
    })
    .then(data => {
      screamData.comments = [];
      data.forEach(doc => {
        screamData.comments.push(doc.data());
      });
      return res.json(screamData);
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ error: error.code });
    });
};

// add comments to scream
exports.commentOnScream = (req, res) => {
  if (req.body.body.trim() === '')
    return res.status(400).json({ error: 'Must not be empty' });
  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    screamId: req.params.screamId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl
  };
  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' });
      }
      return db.collection('comments').add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    });
};
