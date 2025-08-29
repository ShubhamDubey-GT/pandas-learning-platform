
const { executeQuery } = require('../config/database');

/**
 * @desc    Update user progress for a topic
 * @route   POST /api/progress
 * @access  Private
 */
const updateProgress = async (req, res) => {
  try {
    const { moduleId, topicId, completed, timeSpent = 0, notes = '' } = req.body;
    const userId = req.user.id;

    // Validation
    if (!moduleId || !topicId) {
      return res.status(400).json({
        status: 'error',
        message: 'Module ID and Topic ID are required'
      });
    }

    if (global.DB_TYPE === 'mysql') {
      // Check if progress record exists
      const existingProgress = await executeQuery(
        'SELECT id FROM progress WHERE user_id = ? AND module_id = ? AND topic_id = ?',
        [userId, moduleId, topicId]
      );

      if (existingProgress.length > 0) {
        // Update existing record
        await executeQuery(`
          UPDATE progress 
          SET completed = ?, time_spent = ?, notes = ?, 
              completion_date = ?, updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ? AND module_id = ? AND topic_id = ?
        `, [
          completed, 
          timeSpent, 
          notes, 
          completed ? new Date() : null,
          userId, 
          moduleId, 
          topicId
        ]);
      } else {
        // Insert new record
        await executeQuery(`
          INSERT INTO progress (user_id, module_id, topic_id, completed, time_spent, notes, completion_date)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
          userId, 
          moduleId, 
          topicId, 
          completed, 
          timeSpent, 
          notes, 
          completed ? new Date() : null
        ]);
      }

      // Get updated progress data
      const updatedProgress = await executeQuery(`
        SELECT * FROM progress 
        WHERE user_id = ? AND module_id = ? AND topic_id = ?
      `, [userId, moduleId, topicId]);

      return res.status(200).json({
        status: 'success',
        message: 'Progress updated successfully',
        data: { progress: updatedProgress[0] }
      });
    } else {
      // MongoDB implementation would go here
      return res.status(200).json({
        status: 'success',
        message: 'Progress updated (MongoDB not implemented yet)'
      });
    }
  } catch (error) {
    console.error('Update Progress Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating progress'
    });
  }
};

/**
 * @desc    Get user progress for all modules
 * @route   GET /api/progress
 * @access  Private
 */
const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    if (global.DB_TYPE === 'mysql') {
      const progressData = await executeQuery(`
        SELECT p.*, m.title as module_title, m.difficulty
        FROM progress p
        LEFT JOIN modules m ON p.module_id = m.id
        WHERE p.user_id = ?
        ORDER BY p.updated_at DESC
      `, [userId]);

      // Group by modules
      const groupedProgress = progressData.reduce((acc, item) => {
        const moduleId = item.module_id;
        if (!acc[moduleId]) {
          acc[moduleId] = {
            moduleId: moduleId,
            moduleTitle: item.module_title,
            difficulty: item.difficulty,
            topics: [],
            completedTopics: 0,
            totalTimeSpent: 0
          };
        }

        acc[moduleId].topics.push({
          topicId: item.topic_id,
          completed: Boolean(item.completed),
          timeSpent: item.time_spent || 0,
          notes: item.notes || '',
          completionDate: item.completion_date,
          lastUpdated: item.updated_at
        });

        if (item.completed) {
          acc[moduleId].completedTopics++;
        }
        acc[moduleId].totalTimeSpent += (item.time_spent || 0);

        return acc;
      }, {});

      return res.status(200).json({
        status: 'success',
        data: { 
          progress: Object.values(groupedProgress),
          summary: {
            totalTopicsCompleted: progressData.filter(p => p.completed).length,
            totalTimeSpent: progressData.reduce((sum, p) => sum + (p.time_spent || 0), 0),
            modulesStarted: Object.keys(groupedProgress).length,
            currentStreak: 1 // TODO: Calculate actual streak
          }
        }
      });
    } else {
      // Return mock data for MongoDB or if no database
      return res.status(200).json({
        status: 'success',
        data: { 
          progress: [],
          summary: {
            totalTopicsCompleted: 0,
            totalTimeSpent: 0,
            modulesStarted: 0,
            currentStreak: 0
          }
        }
      });
    }
  } catch (error) {
    console.error('Get User Progress Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching user progress'
    });
  }
};

/**
 * @desc    Get user progress for specific module
 * @route   GET /api/progress/:moduleId
 * @access  Private
 */
const getModuleProgress = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.user.id;

    if (global.DB_TYPE === 'mysql') {
      const progressData = await executeQuery(`
        SELECT p.*, m.title as module_title, m.difficulty, m.topics as module_topics
        FROM progress p
        JOIN modules m ON p.module_id = m.id
        WHERE p.user_id = ? AND p.module_id = ?
        ORDER BY p.updated_at DESC
      `, [userId, moduleId]);

      if (progressData.length === 0) {
        return res.status(200).json({
          status: 'success',
          data: { 
            progress: [],
            moduleInfo: null
          }
        });
      }

      // Calculate completion statistics
      const completedCount = progressData.filter(p => p.completed).length;
      const totalTimeSpent = progressData.reduce((sum, p) => sum + (p.time_spent || 0), 0);

      // Parse module topics if available
      let moduleTopics = [];
      if (progressData[0].module_topics) {
        try {
          moduleTopics = JSON.parse(progressData[0].module_topics);
        } catch (e) {
          console.error('Error parsing module topics:', e);
        }
      }

      return res.status(200).json({
        status: 'success',
        data: {
          progress: progressData.map(p => ({
            topicId: p.topic_id,
            completed: Boolean(p.completed),
            timeSpent: p.time_spent || 0,
            notes: p.notes || '',
            completionDate: p.completion_date,
            lastUpdated: p.updated_at
          })),
          moduleInfo: {
            moduleId: moduleId,
            title: progressData[0].module_title,
            difficulty: progressData[0].difficulty,
            topics: moduleTopics,
            completedTopics: completedCount,
            totalTopics: moduleTopics.length,
            completionPercentage: moduleTopics.length > 0 ? (completedCount / moduleTopics.length * 100).toFixed(1) : 0,
            totalTimeSpent: totalTimeSpent
          }
        }
      });
    } else {
      return res.status(200).json({
        status: 'success',
        data: { progress: [], moduleInfo: null }
      });
    }
  } catch (error) {
    console.error('Get Module Progress Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching module progress'
    });
  }
};

module.exports = {
  updateProgress,
  getUserProgress,
  getModuleProgress
};
