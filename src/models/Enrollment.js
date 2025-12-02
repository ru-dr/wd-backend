/**
 * Enrollment Model
 * MongoDB schema for course enrollments
 */

import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    index: true,
  },
  course: {
    type: String,
    required: true,
    index: true,
  },
  role: {
    type: String,
    enum: ['STUDENT', 'FACULTY', 'TA'],
    default: 'STUDENT',
  },
}, {
  timestamps: true,
  collection: 'enrollments',
});

// Compound index for unique user-course combination
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
