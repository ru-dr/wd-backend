/**
 * Modules Controller
 * Business logic for module operations
 */

import ModulesDao from './dao.js';

export default class ModulesController {
  constructor() {
    this.dao = new ModulesDao();
  }

  /**
   * Find all modules for a specific course
   * GET /api/courses/:courseId/modules
   */
  findModulesForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = await this.dao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      console.error('Find modules error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving modules',
        error: error.message,
      });
    }
  };

  /**
   * Find a specific module by ID
   * GET /api/modules/:moduleId
   */
  findModuleById = async (req, res) => {
    try {
      const { moduleId } = req.params;
      const module = await this.dao.findModuleById(moduleId);

      if (!module) {
        return res.status(404).json({
          success: false,
          message: `Module with ID ${moduleId} not found`,
        });
      }

      res.json(module);
    } catch (error) {
      console.error('Find module error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving module',
        error: error.message,
      });
    }
  };

  /**
   * Create a new module for a course
   * POST /api/courses/:courseId/modules
   */
  createModuleForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const moduleData = {
        ...req.body,
        course: courseId,
      };

      const newModule = await this.dao.createModule(moduleData);
      res.status(201).json(newModule);
    } catch (error) {
      console.error('Create module error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating module',
        error: error.message,
      });
    }
  };

  /**
   * Update an existing module
   * PUT /api/modules/:moduleId
   */
  updateModule = async (req, res) => {
    try {
      const { moduleId } = req.params;
      const moduleUpdates = req.body;

      const updatedModule = await this.dao.updateModule(moduleId, moduleUpdates);

      if (!updatedModule) {
        return res.status(404).json({
          success: false,
          message: `Unable to update Module with ID ${moduleId}`,
        });
      }

      res.json(updatedModule);
    } catch (error) {
      console.error('Update module error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating module',
        error: error.message,
      });
    }
  };

  /**
   * Delete a module
   * DELETE /api/modules/:moduleId
   */
  deleteModule = async (req, res) => {
    try {
      const { moduleId } = req.params;
      const deleted = await this.dao.deleteModule(moduleId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: `Unable to delete Module with ID ${moduleId}`,
        });
      }

      res.sendStatus(200);
    } catch (error) {
      console.error('Delete module error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting module',
        error: error.message,
      });
    }
  };

  /**
   * Find all modules (optional - for admin)
   * GET /api/modules
   */
  findAllModules = async (req, res) => {
    try {
      const modules = await this.dao.findAllModules();
      res.json(modules);
    } catch (error) {
      console.error('Find all modules error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving modules',
        error: error.message,
      });
    }
  };
}
