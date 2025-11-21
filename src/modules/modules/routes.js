/**
 * Modules Routes
 * API endpoints for module operations
 */

import ModulesController from './controller.js';

export default function ModuleRoutes(app, db) {
  const controller = new ModulesController(db);

  // Get all modules for a specific course
  app.get('/api/courses/:courseId/modules', controller.findModulesForCourse);

  // Create new module for a course
  app.post('/api/courses/:courseId/modules', controller.createModuleForCourse);

  // Get specific module by ID
  app.get('/api/modules/:moduleId', controller.findModuleById);

  // Update module
  app.put('/api/modules/:moduleId', controller.updateModule);

  // Delete module
  app.delete('/api/modules/:moduleId', controller.deleteModule);

  // Get all modules (optional - for admin)
  app.get('/api/modules', controller.findAllModules);
}
