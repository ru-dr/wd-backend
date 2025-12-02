/**
 * Assignments Controller
 * Business logic for assignment operations
 */

import AssignmentsDao from './dao.js';

export default class AssignmentsController {
  constructor() {
    this.dao = new AssignmentsDao();
  }

  /**
   * Find all assignments for a specific course
   * GET /api/courses/:courseId/assignments
   */
  findAssignmentsForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await this.dao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (error) {
      console.error('Find assignments error:', error);
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
  findAssignmentById = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignment = await this.dao.findAssignmentById(assignmentId);

      if (!assignment) {
        return res.status(404).json({
          success: false,
          message: `Assignment with ID ${assignmentId} not found`,
        });
      }

      res.json(assignment);
    } catch (error) {
      console.error('Find assignment error:', error);
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
  createAssignmentForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignmentData = {
        ...req.body,
        course: courseId,
      };

      const newAssignment = await this.dao.createAssignment(assignmentData);
      res.status(201).json(newAssignment);
    } catch (error) {
      console.error('Create assignment error:', error);
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
  updateAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignmentUpdates = req.body;

      const updatedAssignment = await this.dao.updateAssignment(assignmentId, assignmentUpdates);

      if (!updatedAssignment) {
        return res.status(404).json({
          success: false,
          message: `Unable to update Assignment with ID ${assignmentId}`,
        });
      }

      res.json(updatedAssignment);
    } catch (error) {
      console.error('Update assignment error:', error);
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
  deleteAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const deleted = await this.dao.deleteAssignment(assignmentId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: `Unable to delete Assignment with ID ${assignmentId}`,
        });
      }

      res.sendStatus(200);
    } catch (error) {
      console.error('Delete assignment error:', error);
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
  findAllAssignments = async (req, res) => {
    try {
      const assignments = await this.dao.findAllAssignments();
      res.json(assignments);
    } catch (error) {
      console.error('Find all assignments error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving assignments',
        error: error.message,
      });
    }
  };
}
