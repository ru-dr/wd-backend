/**
 * Assignments Controller
 * Business logic for assignment operations
 */

import AssignmentsDao from './dao.js';

export default class AssignmentsController {
  constructor(db) {
    this.dao = new AssignmentsDao(db);
  }

  /**
   * Find all assignments for a specific course
   * GET /api/courses/:courseId/assignments
   */
  findAssignmentsForCourse = (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = this.dao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving assignments',
        error: error.message,
      });
    }
  };

  /**
   * Find a specific assignment by ID
   * GET /api/assignments/:assignmentId
   */
  findAssignmentById = (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignment = this.dao.findAssignmentById(assignmentId);

      if (!assignment) {
        return res.status(404).json({
          success: false,
          message: `Assignment with ID ${assignmentId} not found`,
        });
      }

      res.json(assignment);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving assignment',
        error: error.message,
      });
    }
  };

  /**
   * Create a new assignment for a course
   * POST /api/courses/:courseId/assignments
   */
  createAssignmentForCourse = (req, res) => {
    try {
      const { courseId } = req.params;
      const assignmentData = {
        ...req.body,
        course: courseId,
      };

      const newAssignment = this.dao.createAssignment(assignmentData);
      res.status(201).json(newAssignment);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating assignment',
        error: error.message,
      });
    }
  };

  /**
   * Update an existing assignment
   * PUT /api/assignments/:assignmentId
   */
  updateAssignment = (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignmentUpdates = req.body;

      const updatedAssignment = this.dao.updateAssignment(assignmentId, assignmentUpdates);

      if (!updatedAssignment) {
        return res.status(404).json({
          success: false,
          message: `Unable to update Assignment with ID ${assignmentId}`,
        });
      }

      res.json(updatedAssignment);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating assignment',
        error: error.message,
      });
    }
  };

  /**
   * Delete an assignment
   * DELETE /api/assignments/:assignmentId
   */
  deleteAssignment = (req, res) => {
    try {
      const { assignmentId } = req.params;
      const deleted = this.dao.deleteAssignment(assignmentId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: `Unable to delete Assignment with ID ${assignmentId}`,
        });
      }

      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting assignment',
        error: error.message,
      });
    }
  };

  /**
   * Find all assignments (optional - for admin)
   * GET /api/assignments
   */
  findAllAssignments = (req, res) => {
    try {
      const assignments = this.dao.findAllAssignments();
      res.json(assignments);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving assignments',
        error: error.message,
      });
    }
  };
}
