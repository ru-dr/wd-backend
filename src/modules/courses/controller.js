/**
 * Courses Controller
 * Business logic for course operations
 */

import CoursesDao from './dao.js';
import EnrollmentsDao from '../enrollments/dao.js';

export default class CoursesController {
  constructor() {
    this.dao = new CoursesDao();
    this.enrollmentsDao = new EnrollmentsDao();
  }

  /**
   * Get all courses
   */
  findAllCourses = async (req, res) => {
    try {
      const courses = await this.dao.findAllCourses();
      res.json({
        success: true,
        data: courses,
      });
    } catch (error) {
      console.error('Find all courses error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching courses',
      });
    }
  };

  /**
   * Get courses for current enrolled user
   */
  findCoursesForCurrentUser = async (req, res) => {
    try {
      let { userId } = req.params;

      // Handle 'current' as userId
      if (userId === 'current') {
        const currentUser = req.session.currentUser;
        if (!currentUser) {
          return res.status(401).json({
            success: false,
            message: 'Not authenticated',
          });
        }
        userId = currentUser._id;
      }

      const courses = await this.dao.findCoursesForEnrolledUser(userId);
      res.json({
        success: true,
        data: courses,
      });
    } catch (error) {
      console.error('Find courses for user error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching user courses',
      });
    }
  };

  /**
   * Get course by ID
   */
  findCourseById = async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await this.dao.findCourseById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found',
        });
      }

      res.json({
        success: true,
        data: course,
      });
    } catch (error) {
      console.error('Find course by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching course',
      });
    }
  };

  /**
   * Create a new course
   */
  createCourse = async (req, res) => {
    try {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated',
        });
      }

      const newCourse = await this.dao.createCourse(req.body);

      // Auto-enroll the creator in the course
      await this.enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);

      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: newCourse,
      });
    } catch (error) {
      console.error('Create course error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating course',
      });
    }
  };

  /**
   * Update course
   */
  updateCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await this.dao.findCourseById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found',
        });
      }

      const updatedCourse = await this.dao.updateCourse(courseId, req.body);

      res.json({
        success: true,
        message: 'Course updated successfully',
        data: updatedCourse,
      });
    } catch (error) {
      console.error('Update course error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating course',
      });
    }
  };

  /**
   * Delete course
   */
  deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await this.dao.findCourseById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found',
        });
      }

      await this.dao.deleteCourse(courseId);

      res.json({
        success: true,
        message: 'Course deleted successfully',
      });
    } catch (error) {
      console.error('Delete course error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting course',
      });
    }
  };
}
