
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { connectDatabase } = require('./src/config/database');

// Import Routes
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');  
const moduleRoutes = require('./src/routes/modules');
const progressRoutes = require('./src/routes/progress');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDatabase();

// Security Middleware
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000,
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});

app.use(limiter);

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
};

app.use(cors(corsOptions));

// General Middleware
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Pandas Learning Platform API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    database: global.DB_TYPE || 'not connected'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/progress', progressRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Pandas Learning Platform API',
    status: 'active',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      modules: '/api/modules', 
      progress: '/api/progress',
      users: '/api/users'
    }
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`,
    availableEndpoints: ['/health', '/api/auth', '/api/modules', '/api/progress', '/api/users']
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`
🚀 Pandas Learning Platform Backend is READY!
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📡 Server: http://localhost:${PORT}
🏥 Health: http://localhost:${PORT}/health
📚 API: http://localhost:${PORT}/api
🔗 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:3000'}
⏰ Started: ${new Date().toISOString()}

🎯 Available Endpoints:
   • POST /api/auth/register - User registration
   • POST /api/auth/login - User login
   • GET  /api/auth/me - Current user info
   • GET  /api/modules - All learning modules
   • GET  /api/modules/:id - Specific module
   • POST /api/progress - Update topic progress
   • GET  /api/progress - User progress summary

Ready for pandas learning! 🐼📚
  `);
});

module.exports = app;
