/**
 * Enrollments Controller
 * Business logic for enrollment operations
 */

import EnrollmentsDao from './dao.js';

export default class EnrollmentsController {
  constructor(db) {
    this.dao = new EnrollmentsDao(db);
  }

  /**
   * Enroll current user in a course
   * POST /api/courses/:courseId/enroll
   */
  enrollInCourse = (req, res) => {
    try {
      const { courseId } = req.params;
      const currentUser = req.session['currentUser'];

      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'Must be logged in to enroll in courses',
        });
      }

      const enrollment = this.dao.enrollUserInCourse(currentUser._id, courseId);
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error enrolling in course',
        error: error.message,
      });
    }
  };

  /**
   * Unenroll current user from a course
   * DELETE /api/courses/:courseId/enroll
   */
  unenrollFromCourse = (req, res) => {
    try {
      const { courseId } = req.params;
      const currentUser = req.session['currentUser'];

      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'Must be logged in to unenroll from courses',
        });
      }

      const unenrolled = this.dao.unenrollUserFromCourse(currentUser._id, courseId);

      if (!unenrolled) {
        return res.status(404).json({
          success: false,
          message: 'Enrollment not found',
        });
      }

      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error unenrolling from course',
        error: error.message,
      });
    }
  };

  /**
   * Get all enrollments for current user
   * GET /api/users/current/enrollments
   */
  findEnrollmentsForCurrentUser = (req, res) => {
    try {
      const currentUser = req.session['currentUser'];

      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'Must be logged in to view enrollments',
        });
      }

      const enrollments = this.dao.findEnrollmentsForUser(currentUser._id);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving enrollments',
        error: error.message,
      });
    }
  };

  /**
   * Get all enrollments for a specific course
   * GET /api/courses/:courseId/enrollments
   */
  findEnrollmentsForCourse = (req, res) => {
    try {
      const { courseId } = req.params;
      const enrollments = this.dao.findEnrollmentsForCourse(courseId);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving course enrollments',
        error: error.message,
      });
    }
  };

  /**
   * Check if current user is enrolled in a course
   * GET /api/courses/:courseId/enrolled
   */
  checkEnrollment = (req, res) => {
    try {
      const { courseId } = req.params;
      const currentUser = req.session['currentUser'];

      if (!currentUser) {
        return res.json({ enrolled: false });
      }

      const enrolled = this.dao.isUserEnrolledInCourse(currentUser._id, courseId);
      res.json({ enrolled });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error checking enrollment status',
        error: error.message,
      });
    }
  };

  /**
   * Get all enrollments (admin only)
   * GET /api/enrollments
   */
  findAllEnrollments = (req, res) => {
    try {
      const enrollments = this.dao.findAllEnrollments();
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving all enrollments',
        error: error.message,
      });
    }
  };
}
