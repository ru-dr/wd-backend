/**
 * Enrollments Controller
 * Business logic for enrollment operations
 */

import EnrollmentsDao from './dao.js';

export default class EnrollmentsController {
  constructor() {
    this.dao = new EnrollmentsDao();
  }

  /**
   * Enroll current user in a course
   * POST /api/courses/:courseId/enroll
   */
  enrollInCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const currentUser = req.session['currentUser'];

      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'Must be logged in to enroll in courses',
        });
      }

      const enrollment = await this.dao.enrollUserInCourse(currentUser._id, courseId);
      res.status(201).json(enrollment);
    } catch (error) {
      console.error('Enroll error:', error);
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
  unenrollFromCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const currentUser = req.session['currentUser'];

      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'Must be logged in to unenroll from courses',
        });
      }

      const unenrolled = await this.dao.unenrollUserFromCourse(currentUser._id, courseId);

      if (!unenrolled) {
        return res.status(404).json({
          success: false,
          message: 'Enrollment not found',
        });
      }

      res.sendStatus(200);
    } catch (error) {
      console.error('Unenroll error:', error);
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
  findEnrollmentsForCurrentUser = async (req, res) => {
    try {
      const currentUser = req.session['currentUser'];

      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'Must be logged in to view enrollments',
        });
      }

      const enrollments = await this.dao.findEnrollmentsForUser(currentUser._id);
      res.json(enrollments);
    } catch (error) {
      console.error('Find enrollments error:', error);
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
  findEnrollmentsForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const enrollments = await this.dao.findEnrollmentsForCourse(courseId);
      res.json(enrollments);
    } catch (error) {
      console.error('Find course enrollments error:', error);
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
  checkEnrollment = async (req, res) => {
    try {
      const { courseId } = req.params;
      const currentUser = req.session['currentUser'];

      if (!currentUser) {
        return res.json({ enrolled: false });
      }

      const enrolled = await this.dao.isUserEnrolledInCourse(currentUser._id, courseId);
      res.json({ enrolled });
    } catch (error) {
      console.error('Check enrollment error:', error);
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
  findAllEnrollments = async (req, res) => {
    try {
      const enrollments = await this.dao.findAllEnrollments();
      res.json(enrollments);
    } catch (error) {
      console.error('Find all enrollments error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving all enrollments',
        error: error.message,
      });
    }
  };

  /**
   * Get all users enrolled in a course with full user data
   * GET /api/courses/:courseId/users
   */
  findUsersForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const users = await this.dao.findUsersForCourse(courseId);
      res.json(users);
    } catch (error) {
      console.error('Find users for course error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving users for course',
        error: error.message,
      });
    }
  };
}
