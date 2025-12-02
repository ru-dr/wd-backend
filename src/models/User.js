/**
 * User Model
 * MongoDB schema for users
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  dob: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['STUDENT', 'FACULTY', 'ADMIN', 'TA'],
    default: 'STUDENT',
  },
  loginId: {
    type: String,
    default: '',
  },
  section: {
    type: String,
    default: '',
  },
  lastActivity: {
    type: String,
    default: '',
  },
  totalActivity: {
    type: String,
    default: '00:00:00',
  },
}, {
  timestamps: true,
  collection: 'users',
});

const User = mongoose.model('User', userSchema);

export default User;
