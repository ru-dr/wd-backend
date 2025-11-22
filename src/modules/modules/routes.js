/**
 * Modules Routes
 * API endpoints for module operations
 */

import ModulesController from './controller.js';

export default function ModuleRoutes(app, db) {
  const controller = new ModulesController(db);

  
  app.get('/api/courses/:courseId/modules', controller.findModulesForCourse);

  
  app.post('/api/courses/:courseId/modules', controller.createModuleForCourse);

  
  app.get('/api/modules/:moduleId', controller.findModuleById);

  
  app.put('/api/modules/:moduleId', controller.updateModule);

  
  app.delete('/api/modules/:moduleId', controller.deleteModule);

  
  app.get('/api/modules', controller.findAllModules);
}
