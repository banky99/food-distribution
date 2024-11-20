const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).send({ error: 'Authorization header missing' });
  }

  // Check if the header is properly formatted as 'Bearer <token>'
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).send({ error: 'Malformed authorization header.' });
  }

  const token = parts[1];

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret'); // Fallback for local dev
    req.user = decoded; // Attach user data to the request
    next(); // Pass control to the next middleware
  } catch (err) {
    return res.status(401).send({ error: 'Invalid token.' });
  }
};

module.exports = authenticate;
