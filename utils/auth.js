const withAuth = (req, res, next) => {
  // TODO: Add a comment describing the functionality of this if statement
  // Direct logged in user to logged in page
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
