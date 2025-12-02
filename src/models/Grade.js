/**
 * Grade Model
 * MongoDB schema for grades
 */

import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    index: true,
  },
  assignment: {
    type: String,
    required: true,
    index: true,
  },
  course: {
    type: String,
    required: true,
    index: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    default: '',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  collection: 'grades',
});

const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;
