# Pandas Learning Platform - Full Stack Application

A comprehensive, production-ready learning platform for mastering pandas from zero to hero. Built with Next.js, Express.js, and supporting both MySQL (local) and MongoDB (production) databases.

## 🚀 Features

- **Full-Stack Architecture**: Next.js frontend with Express.js backend
- **Authentication System**: JWT-based login/register with secure password hashing
- **Progress Tracking**: Comprehensive user progress stored in database
- **Interactive Learning**: 15 modules covering pandas from basics to advanced
- **Dual Database Support**: MySQL for local development, MongoDB for production
- **Responsive Design**: Mobile-first approach with modern UI
- **Code Highlighting**: Syntax-highlighted code examples with copy functionality
- **Practice Datasets**: 5 realistic datasets for hands-on learning
- **Docker Support**: Complete containerization for easy deployment

## 📁 Project Structure

```
pandas-learning-platform/
├── README.md
├── package.json                 # Root package with dev scripts
├── docker-compose.yml          # Complete Docker setup
├── .env.example               # Environment configuration
│
├── frontend/                  # Next.js Application
│   ├── src/
│   │   ├── app/              # App Router (Next.js 14+)
│   │   │   ├── auth/         # Login/Register pages
│   │   │   ├── dashboard/    # User dashboard
│   │   │   └── modules/      # Learning modules
│   │   └── components/       # React components
│   ├── public/
│   │   └── datasets/         # Practice datasets (CSV/JSON)
│   └── package.json
│
├── backend/                   # Express.js API Server
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Authentication & validation
│   │   ├── routes/           # API endpoints
│   │   └── utils/            # Helper functions
│   ├── server.js            # Main server file
│   └── package.json
│
└── database/
    └── mysql/
        └── init.sql          # Database schema & seed data
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** for styling
- **React Hook Form** for form handling
- **Axios** for API requests

### Backend  
- **Express.js** with MVC architecture
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Joi** for input validation
- **MySQL2** / **Mongoose** for database

### Database
- **MySQL** (local development with your password 'inertone')
- **MongoDB** (production deployment)

## 🚦 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone and start everything with Docker
git clone <your-repo>
cd pandas-learning-platform
docker-compose up -d

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MySQL: localhost:3306
```

### Option 2: Manual Setup

#### 1. Install Dependencies
```bash
npm run install:all
```

#### 2. Setup Environment
```bash
# Copy environment files
cp .env.example .env
cp frontend/.env.local.example frontend/.env.local
cp backend/.env.example backend/.env

# Update backend/.env with your MySQL password
DB_PASSWORD=inertone
```

#### 3. Setup MySQL Database
```bash
# Create database
mysql -u root -p
CREATE DATABASE pandas_learning;
EXIT;

# Initialize schema
mysql -u root -p pandas_learning < database/mysql/init.sql
```

#### 4. Start Development Servers
```bash
npm run dev

# Or individually:
npm run dev:backend   # Port 5000
npm run dev:frontend  # Port 3000
```

## 🔐 Default Login

The database initializes with sample data. For testing:

- Visit: http://localhost:3000
- Register a new account or create test data

## 📊 Learning Content

### 15 Complete Modules
1. **Pandas Fundamentals** - Introduction and basic concepts
2. **Data Structures** - Series and DataFrame mastery  
3. **Data Loading** - CSV, JSON, Excel, database integration
4. **Data Exploration** - Inspection and analysis techniques
5. **Data Selection** - Advanced indexing and filtering
6. **Data Cleaning** - Missing values and preprocessing
7. **Data Transformation** - Manipulation and feature engineering
8. **Data Aggregation** - GroupBy and pivot operations
9. **Data Merging** - Joins and concatenation
10. **Time Series** - Temporal data analysis
11. **Advanced Operations** - Performance and optimization
12. **Visualization** - Plotting and charts
13. **File Operations** - Advanced I/O operations
14. **Machine Learning** - ML integration with pandas
15. **Best Practices** - Production-ready code

### Practice Datasets
- **Sales Data** (1,000 rows) - E-commerce transactions
- **Employee Data** (500 rows) - HR and salary information  
- **Weather Data** (2,920 rows) - Multi-city weather patterns
- **Student Grades** (3,238 rows) - Academic performance
- **Financial Data** (2,080 rows) - Stock market data

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
# Build frontend
cd frontend && npm run build

# Start production
npm start
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Learning
- `GET /api/modules` - Get all modules
- `GET /api/modules/:id` - Get specific module
- `POST /api/progress` - Update learning progress
- `GET /api/progress` - Get user progress

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=inertone
DB_NAME=pandas_learning
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Pandas Learning Platform
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- Check the `/docs` folder for detailed documentation
- Create issues for bugs or feature requests
- Review API documentation for endpoint details

---

**Start your pandas journey today! 🐼📊**

Built with ❤️ for data science learners everywhere.
