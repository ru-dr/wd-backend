/**
 * Enrollments Routes
 * API endpoints for enrollment operations
 */

import EnrollmentsController from './controller.js';

export default function EnrollmentRoutes(app, db) {
  const controller = new EnrollmentsController(db);

  
  app.post('/api/courses/:courseId/enroll', controller.enrollInCourse);

  
  app.delete('/api/courses/:courseId/enroll', controller.unenrollFromCourse);

  
  app.get('/api/users/current/enrollments', controller.findEnrollmentsForCurrentUser);

  
  app.get('/api/courses/:courseId/enrollments', controller.findEnrollmentsForCourse);

  
  app.get('/api/courses/:courseId/enrolled', controller.checkEnrollment);

  
  app.get('/api/enrollments', controller.findAllEnrollments);
}
