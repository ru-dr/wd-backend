/**
 * Assignments DAO (Data Access Object)
 * Handles all database operations for assignments
 */

import { v4 as uuidv4 } from 'uuid';

export default class AssignmentsDao {
  constructor(db) {
    this.db = db;
  }

  /**
   * Find all assignments for a specific course
   */
  findAssignmentsForCourse(courseId) {
    const { assignments } = this.db;
    return assignments.filter((assignment) => assignment.course === courseId);
  }

  /**
   * Find a specific assignment by ID
   */
  findAssignmentById(assignmentId) {
    const { assignments } = this.db;
    return assignments.find((assignment) => assignment._id === assignmentId);
  }

  /**
   * Create a new assignment for a course
   */
  createAssignment(assignment) {
    const newAssignment = {
      ...assignment,
      _id: uuidv4(),
    };
    this.db.assignments = [...this.db.assignments, newAssignment];
    return newAssignment;
  }

  /**
   * Update an existing assignment
   */
  updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = this.db;
    const assignment = assignments.find((a) => a._id === assignmentId);
    
    if (!assignment) {
      return null;
    }

    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }

  /**
   * Delete an assignment
   */
  deleteAssignment(assignmentId) {
    const { assignments } = this.db;
    const assignmentIndex = assignments.findIndex((a) => a._id === assignmentId);
    
    if (assignmentIndex === -1) {
      return false;
    }

    this.db.assignments = assignments.filter((a) => a._id !== assignmentId);
    return true;
  }

  /**
   * Find all assignments
   */
  findAllAssignments() {
    return this.db.assignments;
  }
}
