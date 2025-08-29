# API Documentation

## Authentication Endpoints

### POST /api/auth/register
Register a new user account.

### POST /api/auth/login  
Authenticate user and return JWT token.

### GET /api/auth/me
Get current authenticated user information.

### POST /api/auth/logout
Logout user and clear authentication token.

## Module Endpoints

### GET /api/modules
Get all available learning modules.

### GET /api/modules/:id
Get specific module by ID.

## Progress Endpoints  

### GET /api/progress
Get user's learning progress across all modules.

### POST /api/progress
Update user's progress for a specific topic.

### GET /api/progress/:moduleId
Get user's progress for a specific module.