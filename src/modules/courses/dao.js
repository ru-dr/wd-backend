/**
 * Courses Data Access Object (DAO)
 * Handles all MongoDB operations for courses
 */

import Course from '../../models/Course.js';
import Enrollment from '../../models/Enrollment.js';

export default class CoursesDao {
  /**
   * Find all courses
   */
  async findAllCourses() {
    const courses = await Course.find({});
    return courses.map(course => this.formatCourse(course));
  }

  /**
   * Find courses for enrolled user
   */
  async findCoursesForEnrolledUser(userId) {
    const enrollments = await Enrollment.find({ user: userId });
    const courseIds = enrollments.map(e => e.course);
    const courses = await Course.find({ _id: { $in: courseIds } });
    return courses.map(course => this.formatCourse(course));
  }

  /**
   * Find course by ID
   */
  async findCourseById(courseId) {
    const course = await Course.findById(courseId);
    return course ? this.formatCourse(course) : null;
  }

  /**
   * Create a new course
   */
  async createCourse(courseData) {
    const newCourse = new Course({
      ...courseData,
      startDate: courseData.startDate || new Date().toISOString().split('T')[0],
      credits: courseData.credits || 4,
    });
    const savedCourse = await newCourse.save();
    return this.formatCourse(savedCourse);
  }

  /**
   * Update course
   */
  async updateCourse(courseId, courseUpdates) {
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $set: courseUpdates },
      { new: true }
    );
    return course ? this.formatCourse(course) : null;
  }

  /**
   * Delete course
   */
  async deleteCourse(courseId) {
    await Course.findByIdAndDelete(courseId);
    // Also delete related enrollments
    await Enrollment.deleteMany({ course: courseId });
    return { success: true, message: 'Course deleted successfully' };
  }

  /**
   * Format course document to include _id as string
   */
  formatCourse(course) {
    const courseObj = course.toObject();
    return {
      ...courseObj,
      _id: courseObj._id.toString(),
    };
  }
}
