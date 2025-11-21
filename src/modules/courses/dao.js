/**
 * Courses Data Access Object (DAO)
 * Handles all database operations for courses
 */

import { v4 as uuidv4 } from 'uuid';

export default function CoursesDao(db) {
  let { courses, enrollments } = db;

  /**
   * Find all courses
   */
  const findAllCourses = () => courses;

  /**
   * Find courses for enrolled user
   */
  const findCoursesForEnrolledUser = (userId) => {
    const enrolledCourses = courses.filter((course) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === course._id
      )
    );
    return enrolledCourses;
  };

  /**
   * Find course by ID
   */
  const findCourseById = (courseId) => {
    return courses.find((course) => course._id === courseId);
  };

  /**
   * Create a new course
   */
  const createCourse = (course) => {
    const newCourse = {
      ...course,
      _id: uuidv4(),
      startDate: course.startDate || new Date().toISOString().split('T')[0],
      credits: course.credits || 4,
    };
    db.courses = [...courses, newCourse];
    return newCourse;
  };

  /**
   * Update course
   */
  const updateCourse = (courseId, courseUpdates) => {
    const course = courses.find((c) => c._id === courseId);
    if (course) {
      Object.assign(course, courseUpdates);
    }
    return course;
  };

  /**
   * Delete course
   */
  const deleteCourse = (courseId) => {
    db.courses = courses.filter((course) => course._id !== courseId);
    db.enrollments = enrollments.filter((enrollment) => enrollment.course !== courseId);
    return { success: true, message: 'Course deleted successfully' };
  };

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    findCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}
