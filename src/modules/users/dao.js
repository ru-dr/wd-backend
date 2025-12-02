/**
 * Users Data Access Object (DAO)
 * Handles all MongoDB operations for users
 */

import User from '../../models/User.js';

export default class UsersDao {
  /**
   * Create a new user
   */
  async createUser(userData) {
    const newUser = new User({
      ...userData,
      lastActivity: new Date().toISOString().split('T')[0],
      totalActivity: '00:00:00',
    });
    const savedUser = await newUser.save();
    return this.formatUser(savedUser);
  }

  /**
   * Find all users
   */
  async findAllUsers() {
    const users = await User.find({});
    return users.map(user => this.formatUser(user));
  }

  /**
   * Find user by ID
   */
  async findUserById(userId) {
    const user = await User.findById(userId);
    return user ? this.formatUser(user) : null;
  }

  /**
   * Find user by username
   */
  async findUserByUsername(username) {
    const user = await User.findOne({ username });
    return user ? this.formatUser(user) : null;
  }

  /**
   * Find user by email
   */
  async findUserByEmail(email) {
    const user = await User.findOne({ email });
    return user ? this.formatUser(user) : null;
  }

  /**
   * Find user by credentials (username and password)
   */
  async findUserByCredentials(username, password) {
    const user = await User.findOne({ username, password });
    return user ? this.formatUser(user) : null;
  }

  /**
   * Update user
   */
  async updateUser(userId, userUpdates) {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: userUpdates },
      { new: true }
    );
    return user ? this.formatUser(user) : null;
  }

  /**
   * Delete user
   */
  async deleteUser(userId) {
    await User.findByIdAndDelete(userId);
    return { success: true, message: 'User deleted successfully' };
  }

  /**
   * Find users by role
   */
  async findUsersByRole(role) {
    const users = await User.find({ role });
    return users.map(user => this.formatUser(user));
  }

  /**
   * Format user document to include _id as string
   */
  formatUser(user) {
    const userObj = user.toObject();
    return {
      ...userObj,
      _id: userObj._id.toString(),
    };
  }
}
