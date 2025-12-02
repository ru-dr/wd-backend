/**
 * Enrollments Routes
 * API endpoints for enrollment operations
 */

import EnrollmentsController from './controller.js';

export default function EnrollmentRoutes(app) {
  const controller = new EnrollmentsController();

  // Enroll current user in a course
  app.post('/api/courses/:courseId/enroll', controller.enrollInCourse);

  // Unenroll current user from a course
  app.delete('/api/courses/:courseId/enroll', controller.unenrollFromCourse);

  // Get enrollments for current user
  app.get('/api/users/current/enrollments', controller.findEnrollmentsForCurrentUser);

  // Get enrollments for a course
  app.get('/api/courses/:courseId/enrollments', controller.findEnrollmentsForCourse);

  // Check if current user is enrolled in a course
  app.get('/api/courses/:courseId/enrolled', controller.checkEnrollment);

  // Get all enrollments
  app.get('/api/enrollments', controller.findAllEnrollments);

  // Get users enrolled in a course
  app.get('/api/courses/:courseId/users', controller.findUsersForCourse);
}
