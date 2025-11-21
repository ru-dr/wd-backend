/**
 * Courses Routes
 * API endpoints for course operations
 */

import CoursesController from './controller.js';

export default function CourseRoutes(app, db) {
  const controller = new CoursesController(db);

  // Get all courses
  app.get('/api/courses', controller.findAllCourses);

  // Get course by ID
  app.get('/api/courses/:courseId', controller.findCourseById);

  // Get courses for current/specific user
  app.get('/api/users/:userId/courses', controller.findCoursesForCurrentUser);

  // Create new course (requires authentication)
  app.post('/api/users/current/courses', controller.createCourse);

  // Update course
  app.put('/api/courses/:courseId', controller.updateCourse);

  // Delete course
  app.delete('/api/courses/:courseId', controller.deleteCourse);
}
