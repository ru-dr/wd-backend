/**
 * Courses Routes
 * API endpoints for course operations
 */

import CoursesController from './controller.js';

export default function CourseRoutes(app, db) {
  const controller = new CoursesController(db);

  
  app.get('/api/courses', controller.findAllCourses);

  
  app.get('/api/courses/:courseId', controller.findCourseById);

  
  app.get('/api/users/:userId/courses', controller.findCoursesForCurrentUser);

  
  app.post('/api/users/current/courses', controller.createCourse);

  
  app.put('/api/courses/:courseId', controller.updateCourse);

  
  app.delete('/api/courses/:courseId', controller.deleteCourse);
}
