const mysql = require('mysql2/promise');
const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    if (process.env.MONGODB_URI) {
      console.log('🔄 Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB connected successfully');
      global.DB_TYPE = 'mongodb';
    } else {
      console.log('🔄 Connecting to MySQL...');
      const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'inertone',
        database: process.env.DB_NAME || 'pandas_learning',
        charset: 'utf8mb4',
        timezone: 'Z',
        waitForConnections: true,
        connectionLimit: 10,   // pool size
        queueLimit: 0
      });

      console.log('✅ MySQL connected successfully');
      global.DB_TYPE = 'mysql';
      global.DB_CONNECTION = pool;
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

const executeQuery = async (query, params = []) => {
  if (global.DB_TYPE !== 'mysql') {
    throw new Error('MySQL query attempted with non-MySQL database');
  }

  try {
    const [rows] = await global.DB_CONNECTION.execute(query, params);
    return rows;
  } catch (error) {
    console.error('MySQL Query Error:', error);
    throw error;
  }
};

// Cleanup
process.on('SIGINT', async () => {
  if (global.DB_TYPE === 'mysql') {
    await global.DB_CONNECTION.end();
  } else if (global.DB_TYPE === 'mongodb') {
    await mongoose.disconnect();
  }
  process.exit(0);
});

module.exports = { connectDatabase, executeQuery };
