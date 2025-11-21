# Kambaz Backend API

Enterprise-grade Node.js/Express backend for the Kambaz Learning Management System.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)

## ✨ Features

- **RESTful API** - Clean, intuitive REST endpoints
- **Session Management** - Secure user sessions with express-session
- **CORS Configuration** - Cross-origin resource sharing support
- **Error Handling** - Centralized error handling middleware
- **Validation** - Input validation utilities
- **Modular Architecture** - Clean separation of concerns
- **Environment Configuration** - Easy environment-based config
- **Request Logging** - Built-in request logging

## 📁 Project Structure

```
wd-backend/
├── src/
│   ├── config/                 # Configuration files
│   │   ├── environment.js      # Environment variables
│   │   └── session.js          # Session configuration
│   │
│   ├── middleware/             # Express middleware
│   │   ├── auth.js             # Authentication middleware
│   │   ├── cors.js             # CORS middleware
│   │   ├── errorHandler.js     # Error handling
│   │   └── logger.js           # Request logging
│   │
│   ├── utils/                  # Utility functions
│   │   ├── response.js         # Response utilities
│   │   └── validation.js       # Validation helpers
│   │
│   ├── database/               # Mock database
│   │   ├── index.js            # Database index
│   │   ├── users.js            # Users data
│   │   ├── courses.js          # Courses data
│   │   ├── modules.js          # Modules data
│   │   ├── assignments.js      # Assignments data
│   │   ├── enrollments.js      # Enrollments data
│   │   └── grades.js           # Grades data
│   │
│   ├── modules/                # Feature modules
│   │   ├── lab5/               # Lab 5 exercises
│   │   │   ├── index.js
│   │   │   ├── pathParameters.js
│   │   │   ├── queryParameters.js
│   │   │   ├── workingWithObjects.js
│   │   │   └── workingWithArrays.js
│   │   │
│   │   ├── users/              # User management
│   │   │   ├── dao.js          # Data access layer
│   │   │   ├── controller.js   # Business logic
│   │   │   └── routes.js       # API routes
│   │   │
│   │   ├── courses/            # Course management
│   │   ├── modules/            # Module management
│   │   ├── assignments/        # Assignment management
│   │   └── enrollments/        # Enrollment management
│   │
│   └── server.js               # Main application entry point
│
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── package.json                # Project dependencies
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   # Copy the example .env file
   cp .env.example .env
   
   # Edit .env with your settings
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Or start the production server:**
   ```bash
   npm start
   ```

The server will start on `http://localhost:4000`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
SERVER_ENV=development
PORT=4000
SERVER_URL=http://localhost:4000

# Client Configuration
CLIENT_URL=http://localhost:3000

# Session Configuration
SESSION_SECRET=your_super_secret_session_key_change_this
```

### Environment Variables Explained

- `SERVER_ENV` - Environment (development/production)
- `PORT` - Server port (default: 4000)
- `SERVER_URL` - Server URL (for production deployment)
- `CLIENT_URL` - Frontend URL (for CORS)
- `SESSION_SECRET` - Secret key for session encryption

## 📚 API Documentation

### Base URL

```
Local: http://localhost:4000
Production: https://your-app.onrender.com
```

### Health Check

```http
GET /
GET /health
```

### Authentication

#### Sign Up
```http
POST /api/users/signup
Content-Type: application/json

{
  "username": "iron_man",
  "password": "stark123",
  "email": "tony@stark.com",
  "firstName": "Tony",
  "lastName": "Stark"
}
```

#### Sign In
```http
POST /api/users/signin
Content-Type: application/json

{
  "username": "iron_man",
  "password": "stark123"
}
```

#### Get Profile
```http
POST /api/users/profile
```

#### Sign Out
```http
POST /api/users/signout
```

#### Update User
```http
PUT /api/users/:userId
Content-Type: application/json

{
  "firstName": "Anthony",
  "lastName": "Stark"
}
```

### Lab 5 Endpoints

#### Path Parameters

```http
GET /lab5/add/:a/:b
GET /lab5/subtract/:a/:b
GET /lab5/multiply/:a/:b
GET /lab5/divide/:a/:b

Example: GET /lab5/add/34/23  → Returns: 57
```

#### Query Parameters

```http
GET /lab5/calculator?operation=add&a=34&b=23

Supported operations: add, subtract, multiply, divide
```

#### Working with Objects

```http
GET /lab5/assignment                    # Get assignment
GET /lab5/assignment/title              # Get title
GET /lab5/assignment/title/:newTitle    # Update title
GET /lab5/module                        # Get module
GET /lab5/module/name                   # Get name
```

#### Working with Arrays

```http
GET  /lab5/todos                        # Get all todos
GET  /lab5/todos?completed=true         # Filter by completed
GET  /lab5/todos/:id                    # Get todo by ID
GET  /lab5/todos/create                 # Create todo (GET)
GET  /lab5/todos/:id/delete             # Delete todo (GET)
GET  /lab5/todos/:id/title/:title       # Update title (GET)

POST   /lab5/todos                      # Create todo (REST)
PUT    /lab5/todos/:id                  # Update todo (REST)
DELETE /lab5/todos/:id                  # Delete todo (REST)
```

### Courses (TODO - Implement these)

```http
GET    /api/courses                     # Get all courses
GET    /api/users/current/courses       # Get enrolled courses
POST   /api/users/current/courses       # Create course
PUT    /api/courses/:courseId           # Update course
DELETE /api/courses/:courseId           # Delete course
```

### Modules (TODO - Implement these)

```http
GET    /api/courses/:courseId/modules   # Get course modules
POST   /api/courses/:courseId/modules   # Create module
PUT    /api/modules/:moduleId           # Update module
DELETE /api/modules/:moduleId           # Delete module
```

### Assignments (TODO - Implement these)

```http
GET    /api/courses/:courseId/assignments    # Get course assignments
POST   /api/courses/:courseId/assignments    # Create assignment
PUT    /api/assignments/:assignmentId        # Update assignment
DELETE /api/assignments/:assignmentId        # Delete assignment
```

### Enrollments (TODO - Implement these)

```http
GET    /api/users/:userId/enrollments        # Get user enrollments
POST   /api/courses/:courseId/enroll         # Enroll in course
DELETE /api/courses/:courseId/unenroll       # Unenroll from course
```

## 🛠️ Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Run tests (TODO)
npm test
```

### Adding a New Module

1. Create folder in `src/modules/`
2. Create `dao.js` for data access
3. Create `controller.js` for business logic
4. Create `routes.js` for API endpoints
5. Import and register routes in `src/server.js`

Example structure:
```
src/modules/courses/
├── dao.js
├── controller.js
└── routes.js
```

## 🚀 Deployment

### Deploy to Render.com

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Render web service:**
   - Connect GitHub repository
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set environment variables in Render:**
   ```
   SERVER_ENV=production
   CLIENT_URL=https://your-frontend.vercel.app
   SERVER_URL=your-app-name.onrender.com
   SESSION_SECRET=your_production_secret
   ```

4. **Deploy and test:**
   - Render will auto-deploy
   - Test endpoints: `https://your-app.onrender.com/health`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of CS5610 Web Development course at Northeastern University.

## 👥 Authors

- Your Name - *Initial work*

## 🙏 Acknowledgments

- Professor Jose Annunziato - Course instructor
- Northeastern University - Khoury College of Computer Sciences
