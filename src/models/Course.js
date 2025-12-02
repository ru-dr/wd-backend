/**
 * Course Model
 * MongoDB schema for courses
 */

import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  fullName: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  term: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'bg-blue-500',
  },
  image: {
    type: String,
    default: null,
  },
  instructor: {
    type: String,
    default: '',
  },
  startDate: {
    type: String,
    default: '',
  },
  endDate: {
    type: String,
    default: '',
  },
  credits: {
    type: Number,
    default: 4,
  },
  department: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
  collection: 'courses',
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
