/**
 * Modules Routes
 * API endpoints for module operations
 */

import ModulesController from './controller.js';

export default function ModuleRoutes(app) {
  const controller = new ModulesController();

  // Get modules for a course
  app.get('/api/courses/:courseId/modules', controller.findModulesForCourse);

  // Create module for a course
  app.post('/api/courses/:courseId/modules', controller.createModuleForCourse);

  // Get module by ID
  app.get('/api/modules/:moduleId', controller.findModuleById);

  // Update module
  app.put('/api/modules/:moduleId', controller.updateModule);

  // Delete module
  app.delete('/api/modules/:moduleId', controller.deleteModule);

  // Get all modules
  app.get('/api/modules', controller.findAllModules);
}
