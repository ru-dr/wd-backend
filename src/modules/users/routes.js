/**
 * Users Routes
 * API endpoints for user operations
 */

import UsersController from './controller.js';

export default function UserRoutes(app, db) {
  const controller = new UsersController(db);

  
  app.post('/api/users/signup', controller.signup);
  app.post('/api/users/signin', controller.signin);
  app.post('/api/users/signout', controller.signout);
  app.post('/api/users/profile', controller.profile);

  
  app.get('/api/users', controller.findAllUsers);
  app.get('/api/users/:userId', controller.findUserById);
  app.put('/api/users/:userId', controller.updateUser);
  app.delete('/api/users/:userId', controller.deleteUser);
}
