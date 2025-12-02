/**
 * Modules DAO (Data Access Object)
 * Handles all MongoDB operations for course modules
 */

import Module from '../../models/Module.js';

export default class ModulesDao {
  /**
   * Find all modules for a specific course
   */
  async findModulesForCourse(courseId) {
    const modules = await Module.find({ course: courseId });
    return modules.map(module => this.formatModule(module));
  }

  /**
   * Find a specific module by ID
   */
  async findModuleById(moduleId) {
    const module = await Module.findById(moduleId);
    return module ? this.formatModule(module) : null;
  }

  /**
   * Create a new module for a course
   */
  async createModule(moduleData) {
    const newModule = new Module(moduleData);
    const savedModule = await newModule.save();
    return this.formatModule(savedModule);
  }

  /**
   * Update an existing module
   */
  async updateModule(moduleId, moduleUpdates) {
    const module = await Module.findByIdAndUpdate(
      moduleId,
      { $set: moduleUpdates },
      { new: true }
    );
    return module ? this.formatModule(module) : null;
  }

  /**
   * Delete a module
   */
  async deleteModule(moduleId) {
    const result = await Module.findByIdAndDelete(moduleId);
    return result !== null;
  }

  /**
   * Find all modules
   */
  async findAllModules() {
    const modules = await Module.find({});
    return modules.map(module => this.formatModule(module));
  }

  /**
   * Format module document to include _id as string
   */
  formatModule(module) {
    const moduleObj = module.toObject();
    return {
      ...moduleObj,
      _id: moduleObj._id.toString(),
      lessons: moduleObj.lessons?.map(lesson => ({
        ...lesson,
        _id: lesson._id?.toString(),
      })) || [],
    };
  }
}
