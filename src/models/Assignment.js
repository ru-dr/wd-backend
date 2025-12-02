/**
 * Assignment Model
 * MongoDB schema for course assignments
 */

import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    default: '',
  },
  points: {
    type: Number,
    default: 100,
  },
  dueDate: {
    type: String,
    default: '',
  },
  availableFrom: {
    type: String,
    default: '',
  },
  availableUntil: {
    type: String,
    default: '',
  },
  assignmentGroup: {
    type: String,
    enum: ['ASSIGNMENTS', 'QUIZZES', 'EXAMS', 'PROJECT'],
    default: 'ASSIGNMENTS',
  },
  displayGradeAs: {
    type: String,
    default: 'Percentage',
  },
  submissionType: {
    type: String,
    default: 'Online',
  },
  onlineEntryOptions: [{
    type: String,
  }],
}, {
  timestamps: true,
  collection: 'assignments',
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
