const jwt = require('jsonwebtoken');
const secretKey = process.env.ACCESS_TOKEN_SECRET; // Retrieve the secret key from an environment variable

const authenticateToken = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers['authorization'];

  // Extract the token from the authorization header
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is found, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({
      success: 0,
      message: 'Access token not found'
    });
  }

  // Verify the token
  jwt.verify(token, secretKey, (error, user) => {
    if (error) {
      return res.status(403).json({
        success: 0,
        message: 'Invalid token'
      });
    }

    // If the token is valid, attach the user object to the request
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;
