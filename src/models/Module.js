/**
 * Module Model
 * MongoDB schema for course modules
 */

import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['READING', 'ASSIGNMENT', 'VIDEO', 'QUIZ'],
    default: 'READING',
  },
});

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  course: {
    type: String,
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['Published', 'Draft', 'Not Started', 'In Progress', 'Completed'],
    default: 'Published',
  },
  lessons: [lessonSchema],
}, {
  timestamps: true,
  collection: 'modules',
});

const Module = mongoose.model('Module', moduleSchema);

export default Module;
