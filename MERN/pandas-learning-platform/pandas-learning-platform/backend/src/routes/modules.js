const express = require('express');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Sample modules data
const modules = [
  {
    id: '01_fundamentals',
    title: 'Pandas Fundamentals',
    description: 'Introduction to pandas library, basic concepts, and core data structures',
    difficulty: 'beginner',
    estimatedTime: '2 hours',
    topics: [
      { id: 'what_is_pandas', title: 'What is Pandas', type: 'theory' },
      { id: 'installation_setup', title: 'Installation and Setup', type: 'practical' },
      { id: 'importing_pandas', title: 'Importing Pandas', type: 'code' },
      { id: 'intro_series', title: 'Introduction to Series', type: 'theory' },
      { id: 'intro_dataframe', title: 'Introduction to DataFrame', type: 'theory' }
    ]
  },
  {
    id: '02_data_structures',
    title: 'Data Structures Deep Dive',
    description: 'Comprehensive understanding of Series and DataFrame structures',
    difficulty: 'beginner',
    estimatedTime: '3 hours',
    topics: [
      { id: 'creating_series', title: 'Creating Series', type: 'practical' },
      { id: 'series_methods', title: 'Series Methods', type: 'theory' },
      { id: 'creating_dataframes', title: 'Creating DataFrames', type: 'practical' }
    ]
  }
];

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    data: { modules }
  });
});

router.get('/:id', (req, res) => {
  const module = modules.find(m => m.id === req.params.id);
  if (!module) {
    return res.status(404).json({
      status: 'error',
      message: 'Module not found'
    });
  }

  res.json({
    status: 'success',
    data: { module }
  });
});

module.exports = router;