/**
 * Database Index
 * Central export for all database collections
 */

import users from './users.js';
import courses from './courses.js';
import modules from './modules.js';
import assignments from './assignments.js';
import enrollments from './enrollments.js';
import grades from './grades.js';

const db = {
  users,
  courses,
  modules,
  assignments,
  enrollments,
  grades,
};

export default db;
