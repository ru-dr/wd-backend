/**
 * Main Server Application
 * Express.js server for Kambaz Learning Management System
 */

import 'dotenv/config';
import express from 'express';
import config from './config/environment.js';
import { configureSession } from './config/session.js';
import corsMiddleware from './middleware/cors.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import requestLogger from './middleware/logger.js';

// Database
import db from './database/index.js';

// Route modules
import Lab5Routes from './modules/lab5/index.js';
import UserRoutes from './modules/users/routes.js';
import CourseRoutes from './modules/courses/routes.js';
import ModuleRoutes from './modules/modules/routes.js';
import AssignmentRoutes from './modules/assignments/routes.js';
import EnrollmentRoutes from './modules/enrollments/routes.js';

// Initialize Express app
const app = express();

// ============================================
// Middleware Configuration (ORDER MATTERS!)
// ============================================

// 1. Request logging
app.use(requestLogger);

// 2. CORS configuration
app.use(corsMiddleware);

// 3. Session configuration
app.use(configureSession());

// 4. Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// Routes
// ============================================

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Kambaz API',
    version: '1.0.0',
    environment: config.server.env,
  });
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Register route modules
Lab5Routes(app);
UserRoutes(app, db);
CourseRoutes(app, db);
ModuleRoutes(app, db);
AssignmentRoutes(app, db);
EnrollmentRoutes(app, db);

// ============================================
// Error Handling (MUST BE LAST!)
// ============================================

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// ============================================
// Start Server
// ============================================

const PORT = config.server.port;

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${config.server.env}`);
  console.log(`📍 Server URL: ${config.server.url}`);
  console.log(`🔗 Client URL: ${config.client.url}`);
  console.log('='.repeat(50));
  console.log('\n✅ Available endpoints:');
  console.log(`   GET  ${config.server.url}/`);
  console.log(`   GET  ${config.server.url}/health`);
  console.log(`   GET  ${config.server.url}/lab5/welcome`);
  console.log(`   POST ${config.server.url}/api/users/signin`);
  console.log(`   POST ${config.server.url}/api/users/signup`);
  console.log(`   GET  ${config.server.url}/api/courses`);
  console.log(`   POST ${config.server.url}/api/users/current/courses`);
  console.log('\n📚 View full API documentation in README.md\n');
});

export default app;
