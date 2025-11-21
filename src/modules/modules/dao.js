/**
 * Modules DAO (Data Access Object)
 * Handles all database operations for course modules
 */

import { v4 as uuidv4 } from 'uuid';

export default class ModulesDao {
  constructor(db) {
    this.db = db;
  }

  /**
   * Find all modules for a specific course
   */
  findModulesForCourse(courseId) {
    const { modules } = this.db;
    return modules.filter((module) => module.course === courseId);
  }

  /**
   * Find a specific module by ID
   */
  findModuleById(moduleId) {
    const { modules } = this.db;
    return modules.find((module) => module._id === moduleId);
  }

  /**
   * Create a new module for a course
   */
  createModule(module) {
    const newModule = {
      ...module,
      _id: uuidv4(),
    };
    this.db.modules = [...this.db.modules, newModule];
    return newModule;
  }

  /**
   * Update an existing module
   */
  updateModule(moduleId, moduleUpdates) {
    const { modules } = this.db;
    const module = modules.find((m) => m._id === moduleId);
    
    if (!module) {
      return null;
    }

    Object.assign(module, moduleUpdates);
    return module;
  }

  /**
   * Delete a module
   */
  deleteModule(moduleId) {
    const { modules } = this.db;
    const moduleIndex = modules.findIndex((m) => m._id === moduleId);
    
    if (moduleIndex === -1) {
      return false;
    }

    this.db.modules = modules.filter((m) => m._id !== moduleId);
    return true;
  }

  /**
   * Find all modules
   */
  findAllModules() {
    return this.db.modules;
  }
}
