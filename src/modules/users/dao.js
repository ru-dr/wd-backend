/**
 * Users Data Access Object (DAO)
 * Handles all database operations for users
 */

import { v4 as uuidv4 } from 'uuid';

export default function UsersDao(db) {
  let { users } = db;

  /**
   * Create a new user
   */
  const createUser = (user) => {
    const newUser = {
      ...user,
      _id: uuidv4(),
      role: user.role || 'STUDENT',
      lastActivity: new Date().toISOString().split('T')[0],
      totalActivity: '00:00:00',
    };
    users = [...users, newUser];
    return newUser;
  };

  /**
   * Find all users
   */
  const findAllUsers = () => users;

  /**
   * Find user by ID
   */
  const findUserById = (userId) => {
    return users.find((user) => user._id === userId);
  };

  /**
   * Find user by username
   */
  const findUserByUsername = (username) => {
    return users.find((user) => user.username === username);
  };

  /**
   * Find user by email
   */
  const findUserByEmail = (email) => {
    return users.find((user) => user.email === email);
  };

  /**
   * Find user by credentials (username and password)
   */
  const findUserByCredentials = (username, password) => {
    return users.find(
      (user) => user.username === username && user.password === password
    );
  };

  /**
   * Update user
   */
  const updateUser = (userId, userUpdates) => {
    users = users.map((user) => 
      user._id === userId ? { ...user, ...userUpdates } : user
    );
    return users.find((user) => user._id === userId);
  };

  /**
   * Delete user
   */
  const deleteUser = (userId) => {
    users = users.filter((user) => user._id !== userId);
    return { success: true, message: 'User deleted successfully' };
  };

  /**
   * Find users by role
   */
  const findUsersByRole = (role) => {
    return users.filter((user) => user.role === role);
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByEmail,
    findUserByCredentials,
    updateUser,
    deleteUser,
    findUsersByRole,
  };
}
