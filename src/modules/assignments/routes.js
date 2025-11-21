/**
 * Assignments Routes
 * API endpoints for assignment operations
 */

import AssignmentsController from './controller.js';

export default function AssignmentRoutes(app, db) {
  const controller = new AssignmentsController(db);

  // Get all assignments for a specific course
  app.get('/api/courses/:courseId/assignments', controller.findAssignmentsForCourse);

  // Create new assignment for a course
  app.post('/api/courses/:courseId/assignments', controller.createAssignmentForCourse);

  // Get specific assignment by ID
  app.get('/api/assignments/:assignmentId', controller.findAssignmentById);

  // Update assignment
  app.put('/api/assignments/:assignmentId', controller.updateAssignment);

  // Delete assignment
  app.delete('/api/assignments/:assignmentId', controller.deleteAssignment);

  // Get all assignments (optional - for admin)
  app.get('/api/assignments', controller.findAllAssignments);
}
