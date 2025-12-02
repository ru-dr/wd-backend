/**
 * Assignments Routes
 * API endpoints for assignment operations
 */

import AssignmentsController from './controller.js';

export default function AssignmentRoutes(app) {
  const controller = new AssignmentsController();

  // Get assignments for a course
  app.get('/api/courses/:courseId/assignments', controller.findAssignmentsForCourse);

  // Create assignment for a course
  app.post('/api/courses/:courseId/assignments', controller.createAssignmentForCourse);

  // Get assignment by ID
  app.get('/api/assignments/:assignmentId', controller.findAssignmentById);

  // Update assignment
  app.put('/api/assignments/:assignmentId', controller.updateAssignment);

  // Delete assignment
  app.delete('/api/assignments/:assignmentId', controller.deleteAssignment);

  // Get all assignments
  app.get('/api/assignments', controller.findAllAssignments);
}
