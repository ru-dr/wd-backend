/**
 * Courses Data Access Object (DAO)
 * Handles all database operations for courses
 */

import { v4 as uuidv4 } from 'uuid';

export default class CoursesDao {
  constructor(db) {
    this.db = db;
  }

  /**
   * Find all courses
   */
  findAllCourses() {
    return this.db.courses;
  }

  /**
   * Find courses for enrolled user
   */
  findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = this.db;
    const enrolledCourses = courses.filter((course) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === course._id
      )
    );
    return enrolledCourses;
  }

  /**
   * Find course by ID
   */
  findCourseById(courseId) {
    return this.db.courses.find((course) => course._id === courseId);
  }

  /**
   * Create a new course
   */
  createCourse(course) {
    const newCourse = {
      ...course,
      _id: uuidv4(),
      startDate: course.startDate || new Date().toISOString().split('T')[0],
      credits: course.credits || 4,
    };
    this.db.courses = [...this.db.courses, newCourse];
    return newCourse;
  }

  /**
   * Update course
   */
  updateCourse(courseId, courseUpdates) {
    const course = this.db.courses.find((c) => c._id === courseId);
    if (course) {
      Object.assign(course, courseUpdates);
    }
    return course;
  }

  /**
   * Delete course
   */
  deleteCourse(courseId) {
    this.db.courses = this.db.courses.filter((course) => course._id !== courseId);
    this.db.enrollments = this.db.enrollments.filter((enrollment) => enrollment.course !== courseId);
    return { success: true, message: 'Course deleted successfully' };
  }
}
