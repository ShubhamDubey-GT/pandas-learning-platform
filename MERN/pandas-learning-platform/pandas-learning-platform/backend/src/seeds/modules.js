
const { executeQuery } = require('../config/database');

const seedModules = async () => {
  try {
    console.log('🌱 Seeding modules...');

    const modules = [
      {
        id: '01_fundamentals',
        title: 'Pandas Fundamentals',
        description: 'Introduction to pandas library, basic concepts, and core data structures',
        difficulty: 'beginner',
        estimated_time: '2 hours',
        order_index: 1,
        topics: JSON.stringify([
          { id: 'what_is_pandas', title: 'What is Pandas', type: 'theory' },
          { id: 'installation_setup', title: 'Installation and Setup', type: 'practical' },
          { id: 'importing_pandas', title: 'Importing Pandas', type: 'code' },
          { id: 'intro_series', title: 'Introduction to Series', type: 'theory' },
          { id: 'intro_dataframe', title: 'Introduction to DataFrame', type: 'theory' }
        ])
      },
      {
        id: '02_data_structures',
        title: 'Data Structures Deep Dive',
        description: 'Comprehensive understanding of Series and DataFrame structures',
        difficulty: 'beginner',
        estimated_time: '3 hours',
        order_index: 2,
        topics: JSON.stringify([
          { id: 'creating_series', title: 'Creating Series', type: 'practical' },
          { id: 'series_methods', title: 'Series Methods', type: 'theory' },
          { id: 'creating_dataframes', title: 'Creating DataFrames', type: 'practical' }
        ])
      }
    ];

    for (const module of modules) {
      await executeQuery(`
        INSERT IGNORE INTO modules (id, title, description, difficulty, estimated_time, order_index, topics)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        module.id,
        module.title,
        module.description,
        module.difficulty,
        module.estimated_time,
        module.order_index,
        module.topics
      ]);
    }

    console.log('✅ Modules seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding modules:', error);
    process.exit(1);
  }
};

seedModules();
