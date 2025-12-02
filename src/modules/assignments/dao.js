/**
 * Assignments DAO (Data Access Object)
 * Handles all MongoDB operations for assignments
 */

import Assignment from '../../models/Assignment.js';

export default class AssignmentsDao {
  /**
   * Find all assignments for a specific course
   */
  async findAssignmentsForCourse(courseId) {
    const assignments = await Assignment.find({ course: courseId });
    return assignments.map(assignment => this.formatAssignment(assignment));
  }

  /**
   * Find a specific assignment by ID
   */
  async findAssignmentById(assignmentId) {
    const assignment = await Assignment.findById(assignmentId);
    return assignment ? this.formatAssignment(assignment) : null;
  }

  /**
   * Create a new assignment for a course
   */
  async createAssignment(assignmentData) {
    const newAssignment = new Assignment(assignmentData);
    const savedAssignment = await newAssignment.save();
    return this.formatAssignment(savedAssignment);
  }

  /**
   * Update an existing assignment
   */
  async updateAssignment(assignmentId, assignmentUpdates) {
    const assignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { $set: assignmentUpdates },
      { new: true }
    );
    return assignment ? this.formatAssignment(assignment) : null;
  }

  /**
   * Delete an assignment
   */
  async deleteAssignment(assignmentId) {
    const result = await Assignment.findByIdAndDelete(assignmentId);
    return result !== null;
  }

  /**
   * Find all assignments
   */
  async findAllAssignments() {
    const assignments = await Assignment.find({});
    return assignments.map(assignment => this.formatAssignment(assignment));
  }

  /**
   * Format assignment document to include _id as string
   */
  formatAssignment(assignment) {
    const assignmentObj = assignment.toObject();
    return {
      ...assignmentObj,
      _id: assignmentObj._id.toString(),
    };
  }
}
