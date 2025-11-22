/**
 * Lab 5 Routes Index
 * Aggregates all Lab 5 route modules
 */

import PathParameters from './pathParameters.js';
import QueryParameters from './queryParameters.js';
import WorkingWithObjects from './workingWithObjects.js';
import WorkingWithArrays from './workingWithArrays.js';

export default function Lab5Routes(app) {
  
  app.get('/lab5/welcome', (req, res) => {
    res.json('Welcome to Lab 5');
  });

  
  PathParameters(app);
  QueryParameters(app);
  WorkingWithObjects(app);
  WorkingWithArrays(app);
}
