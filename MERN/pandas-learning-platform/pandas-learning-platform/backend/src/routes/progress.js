const express = require('express');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Progress routes will be implemented here
router.get('/', authenticate, (req, res) => {
  res.json({ 
    status: 'success',
    data: { 
      progress: [],
      summary: {
        totalTopicsCompleted: 0,
        totalTimeSpent: 0,
        currentStreak: 0
      }
    }
  });
});

router.post('/', authenticate, (req, res) => {
  res.json({ 
    status: 'success',
    message: 'Progress updated successfully' 
  });
});

module.exports = router;