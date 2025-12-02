/**
 * Users Controller
 * Business logic for user operations
 */

import UsersDao from './dao.js';
import { validateRequired, isValidEmail, isValidUsername, isValidPassword } from '../../utils/validation.js';

export default class UsersController {
  constructor() {
    this.dao = new UsersDao();
  }

  /**
   * Register a new user (Signup)
   */
  signup = async (req, res) => {
    try {
      const { username, password, email, firstName, lastName } = req.body;

      // Validate required fields
      const { isValid, errors } = validateRequired(
        ['username', 'password', 'email', 'firstName', 'lastName'],
        req.body
      );

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors,
        });
      }

      // Validate username format
      if (!isValidUsername(username)) {
        return res.status(400).json({
          success: false,
          message: 'Username must be at least 3 characters and contain only letters, numbers, and underscores',
        });
      }

      // Validate email format
      if (!isValidEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format',
        });
      }

      // Validate password strength
      if (!isValidPassword(password)) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters',
        });
      }

      // Check if username already exists
      const existingUser = await this.dao.findUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username already taken',
        });
      }

      // Check if email already exists
      const existingEmail = await this.dao.findUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered',
        });
      }

      // Create user
      const newUser = await this.dao.createUser(req.body);
      
      // Set session
      req.session.currentUser = newUser;

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: newUser,
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({
        success: false,
        message: 'Error registering user',
      });
    }
  };

  /**
   * Authenticate user (Signin)
   */
  signin = async (req, res) => {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required',
        });
      }

      // Find user by credentials
      const user = await this.dao.findUserByCredentials(username, password);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password',
        });
      }

      // Set session
      req.session.currentUser = user;

      res.json({
        success: true,
        message: 'Login successful',
        data: user,
      });
    } catch (error) {
      console.error('Signin error:', error);
      res.status(500).json({
        success: false,
        message: 'Error signing in',
      });
    }
  };

  /**
   * Sign out user
   */
  signout = async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error signing out',
          });
        }
        res.json({
          success: true,
          message: 'Signed out successfully',
        });
      });
    } catch (error) {
      console.error('Signout error:', error);
      res.status(500).json({
        success: false,
        message: 'Error signing out',
      });
    }
  };

  /**
   * Get current user profile
   */
  profile = async (req, res) => {
    try {
      const currentUser = req.session.currentUser;

      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated',
        });
      }

      res.json({
        success: true,
        data: currentUser,
      });
    } catch (error) {
      console.error('Profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching profile',
      });
    }
  };

  /**
   * Update user profile
   */
  updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const updates = req.body;

      // Check if user exists
      const user = await this.dao.findUserById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      // Update user
      const updatedUser = await this.dao.updateUser(userId, updates);

      // Update session if it's the current user
      if (req.session.currentUser && req.session.currentUser._id === userId) {
        req.session.currentUser = updatedUser;
      }

      res.json({
        success: true,
        message: 'User updated successfully',
        data: updatedUser,
      });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating user',
      });
    }
  };

  /**
   * Get all users
   */
  findAllUsers = async (req, res) => {
    try {
      const users = await this.dao.findAllUsers();
      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error('Find all users error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching users',
      });
    }
  };

  /**
   * Get user by ID
   */
  findUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await this.dao.findUserById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error('Find user by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching user',
      });
    }
  };

  /**
   * Delete user
   */
  deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await this.dao.findUserById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      await this.dao.deleteUser(userId);

      res.json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting user',
      });
    }
  };

  /**
   * Create a new user (admin - without logging in)
   */
  createUser = async (req, res) => {
    try {
      const newUser = await this.dao.createUser(req.body);

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser,
      });
    } catch (error) {
      console.error('Create user error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating user',
      });
    }
  };
}
