/**
 * Enrollments DAO (Data Access Object)
 * Handles all MongoDB operations for enrollments
 */

import Enrollment from '../../models/Enrollment.js';
import User from '../../models/User.js';

export default class EnrollmentsDao {
  /**
   * Enroll a user in a course
   */
  async enrollUserInCourse(userId, courseId, role = 'STUDENT') {
    // Check if enrollment already exists
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    
    if (existingEnrollment) {
      return this.formatEnrollment(existingEnrollment);
    }

    const newEnrollment = new Enrollment({
      user: userId,
      course: courseId,
      role: role,
    });

    const savedEnrollment = await newEnrollment.save();
    return this.formatEnrollment(savedEnrollment);
  }

  /**
   * Unenroll a user from a course
   */
  async unenrollUserFromCourse(userId, courseId) {
    const result = await Enrollment.findOneAndDelete({ user: userId, course: courseId });
    return result !== null;
  }

  /**
   * Find all enrollments for a user
   */
  async findEnrollmentsForUser(userId) {
    const enrollments = await Enrollment.find({ user: userId });
    return enrollments.map(e => this.formatEnrollment(e));
  }

  /**
   * Find all enrollments for a course
   */
  async findEnrollmentsForCourse(courseId) {
    const enrollments = await Enrollment.find({ course: courseId });
    return enrollments.map(e => this.formatEnrollment(e));
  }

  /**
   * Check if user is enrolled in course
   */
  async isUserEnrolledInCourse(userId, courseId) {
    const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
    return enrollment !== null;
  }

  /**
   * Find all enrollments
   */
  async findAllEnrollments() {
    const enrollments = await Enrollment.find({});
    return enrollments.map(e => this.formatEnrollment(e));
  }

  /**
   * Find all users enrolled in a course with full user data
   */
  async findUsersForCourse(courseId) {
    const enrollments = await Enrollment.find({ course: courseId });
    const userIds = enrollments.map(e => e.user);
    
    const users = await User.find({ _id: { $in: userIds } });
    
    return users.map(user => {
      const enrollment = enrollments.find(e => e.user === user._id.toString());
      const userObj = user.toObject();
      return {
        ...userObj,
        _id: userObj._id.toString(),
        enrollmentRole: enrollment?.role || 'STUDENT',
      };
    });
  }

  /**
   * Format enrollment document to include _id as string
   */
  formatEnrollment(enrollment) {
    const enrollmentObj = enrollment.toObject();
    return {
      ...enrollmentObj,
      _id: enrollmentObj._id.toString(),
    };
  }
}
