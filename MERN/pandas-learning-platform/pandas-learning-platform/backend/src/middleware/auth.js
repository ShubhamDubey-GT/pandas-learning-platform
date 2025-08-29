const jwt = require('jsonwebtoken');
const { executeQuery } = require('../config/database');

/**
 * Authentication Middleware
 * Protects routes by verifying JWT token
 */
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Check for token in cookies first, then header
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Access denied. No authentication token provided.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key');

      // Get user from database
      const users = await executeQuery(
        'SELECT id, name, email, created_at FROM users WHERE id = ?',
        [decoded.userId]
      );
      const user = users.length > 0 ? users[0] : null;

      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Authentication failed. User not found.'
        });
      }

      // Add user to request object
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at
      };

      next();
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 'error',
          message: 'Authentication token has expired. Please login again.'
        });
      } else if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid authentication token.'
        });
      } else {
        throw jwtError;
      }
    }
  } catch (error) {
    console.error('Authentication Error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error during authentication'
    });
  }
};

module.exports = {
  authenticate
};