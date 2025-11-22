/**
 * Users Data Access Object (DAO)
 * Handles all database operations for users
 */

import { v4 as uuidv4 } from 'uuid';

export default class UsersDao {
  constructor(db) {
    this.db = db;
  }

  /**
   * Create a new user
   */
  createUser(user) {
    const newUser = {
      ...user,
      _id: uuidv4(),
      role: user.role || 'STUDENT',
      lastActivity: new Date().toISOString().split('T')[0],
      totalActivity: '00:00:00',
    };
    this.db.users = [...this.db.users, newUser];
    return newUser;
  }

  /**
   * Find all users
   */
  findAllUsers() {
    return this.db.users;
  }

  /**
   * Find user by ID
   */
  findUserById(userId) {
    return this.db.users.find((user) => user._id === userId);
  }

  /**
   * Find user by username
   */
  findUserByUsername(username) {
    return this.db.users.find((user) => user.username === username);
  }

  /**
   * Find user by email
   */
  findUserByEmail(email) {
    return this.db.users.find((user) => user.email === email);
  }

  /**
   * Find user by credentials (username and password)
   */
  findUserByCredentials(username, password) {
    return this.db.users.find(
      (user) => user.username === username && user.password === password
    );
  }

  /**
   * Update user
   */
  updateUser(userId, userUpdates) {
    this.db.users = this.db.users.map((user) => 
      user._id === userId ? { ...user, ...userUpdates } : user
    );
    return this.db.users.find((user) => user._id === userId);
  }

  /**
   * Delete user
   */
  deleteUser(userId) {
    this.db.users = this.db.users.filter((user) => user._id !== userId);
    return { success: true, message: 'User deleted successfully' };
  }

  /**
   * Find users by role
   */
  findUsersByRole(role) {
    return this.db.users.filter((user) => user.role === role);
  }
}
