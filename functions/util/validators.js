// validator functhions
/**
 * Handle Error Helper functions
 *
 */
const isEmpty = string => {
  if (string.trim() === '') return true;
  else return false;
};

// Handle Email Error
const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

exports.validateSignUpData = data => {
  let errors = {};
  // email check errors
  if (isEmpty(data.email)) {
    errors.email = 'Email must not be empty';
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid Email address';
  }
  // password check errors
  if (isEmpty(data.password)) errors.password = 'Must not be Empty';
  // confirm password check errors
  if (data.confirmPassword !== data.password)
    errors.confirmPassword = 'Passwords must Match';
  // handle check error
  if (isEmpty(data.handle)) errors.handle = 'Must not be Empty';

  // Check the errors object has any error property

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

// validate login data
exports.validateLoginData = data => {
  let errors = {};
  if (isEmpty(data.email)) errors.email = 'Must not be Empty';
  if (isEmpty(data.password)) errors.password = 'Must not be Empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

// reduce user details function
exports.reduceUserDetails = data => {
  let userDetails = {};

  if (!isEmpty(data.bio.trim())) {
    userDetails.bio = data.bio;
  }

  if (!isEmpty(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== 'http') {
      userDetails.website = `http://${data.website.trim()}`;
    } else {
      userDetails.website = data.website;
    }
  }

  if (!isEmpty(data.location.trim())) {
    userDetails.location = data.location;
  }

  return userDetails;
};
