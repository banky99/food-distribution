const authenticate = (req, res, next) => {
  // Check if the session contains a user
  if (req.session && req.session.user) {
    next(); // User is authenticated; proceed to the next middleware
  } else {
    res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }
};

module.exports = authenticate;
