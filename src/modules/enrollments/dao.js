/**
 * Enrollments DAO (Data Access Object)
 * Handles all database operations for enrollments
 */

import { v4 as uuidv4 } from 'uuid';

export default class EnrollmentsDao {
  constructor(db) {
    this.db = db;
  }

  /**
   * Enroll a user in a course
   */
  enrollUserInCourse(userId, courseId) {
    const { enrollments } = this.db;
    
    
    const existingEnrollment = enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );

    if (existingEnrollment) {
      return existingEnrollment;
    }

    const newEnrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId,
    };

    this.db.enrollments = [...this.db.enrollments, newEnrollment];
    return newEnrollment;
  }

  /**
   * Unenroll a user from a course
   */
  unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = this.db;
    const enrollmentIndex = enrollments.findIndex(
      (e) => e.user === userId && e.course === courseId
    );

    if (enrollmentIndex === -1) {
      return false;
    }

    this.db.enrollments = enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    return true;
  }

  /**
   * Find all enrollments for a user
   */
  findEnrollmentsForUser(userId) {
    const { enrollments } = this.db;
    return enrollments.filter((e) => e.user === userId);
  }

  /**
   * Find all enrollments for a course
   */
  findEnrollmentsForCourse(courseId) {
    const { enrollments } = this.db;
    return enrollments.filter((e) => e.course === courseId);
  }

  /**
   * Check if user is enrolled in course
   */
  isUserEnrolledInCourse(userId, courseId) {
    const { enrollments } = this.db;
    return enrollments.some(
      (e) => e.user === userId && e.course === courseId
    );
  }

  /**
   * Find all enrollments
   */
  findAllEnrollments() {
    return this.db.enrollments;
  }
}
