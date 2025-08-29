const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const errorHandler = require('./src/middleware/errorHandler');
const {connectDatabase} = require('./src/config/database');

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
  optionsSuccessStatus: 200
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
    message: 'Server is running successfully',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/progress', progressRoutes);

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, () => {
  console.log(`
🚀 Pandas Learning Platform Backend Server is running!
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📡 Server URL: http://localhost:${PORT}
🏥 Health Check: http://localhost:${PORT}/health
📚 API Base URL: http://localhost:${PORT}/api
🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}
⏰ Started at: ${new Date().toISOString()}
  `);
});

module.exports = app;