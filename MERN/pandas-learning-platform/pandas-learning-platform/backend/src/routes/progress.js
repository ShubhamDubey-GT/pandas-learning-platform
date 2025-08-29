
const express = require('express');
const { 
  updateProgress, 
  getUserProgress, 
  getModuleProgress 
} = require('../controllers/progressController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All progress routes require authentication
router.use(authenticate);

// Update user progress for a topic
router.post('/', updateProgress);

// Get user's overall progress
router.get('/', getUserProgress);

// Get user's progress for specific module
router.get('/:moduleId', getModuleProgress);

module.exports = router;
