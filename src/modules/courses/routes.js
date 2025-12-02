/**
 * Courses Routes
 * API endpoints for course operations
 */

import CoursesController from './controller.js';

export default function CourseRoutes(app) {
  const controller = new CoursesController();

  // Get all courses
  app.get('/api/courses', controller.findAllCourses);

  // Get course by ID
  app.get('/api/courses/:courseId', controller.findCourseById);

  // Get courses for user (enrolled)
  app.get('/api/users/:userId/courses', controller.findCoursesForCurrentUser);

  // Create course for current user
  app.post('/api/users/current/courses', controller.createCourse);

  // Update course
  app.put('/api/courses/:courseId', controller.updateCourse);

  // Delete course
  app.delete('/api/courses/:courseId', controller.deleteCourse);
}
