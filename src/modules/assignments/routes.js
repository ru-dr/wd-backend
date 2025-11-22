/**
 * Assignments Routes
 * API endpoints for assignment operations
 */

import AssignmentsController from './controller.js';

export default function AssignmentRoutes(app, db) {
  const controller = new AssignmentsController(db);

  app.get('/api/courses/:courseId/assignments', controller.findAssignmentsForCourse);

  app.post('/api/courses/:courseId/assignments', controller.createAssignmentForCourse);

  app.get('/api/assignments/:assignmentId', controller.findAssignmentById);

  app.put('/api/assignments/:assignmentId', controller.updateAssignment);

  app.delete('/api/assignments/:assignmentId', controller.deleteAssignment);

  app.get('/api/assignments', controller.findAllAssignments);
}
