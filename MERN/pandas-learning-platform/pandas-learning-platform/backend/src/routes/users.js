const express = require('express');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// User routes will be implemented here
router.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'User profile endpoint' });
});

module.exports = router;