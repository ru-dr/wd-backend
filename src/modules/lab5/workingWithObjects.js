/**
 * Lab 5 - Working With Objects
 * Routes for object manipulation
 */

const assignment = {
  id: 1,
  title: 'NodeJS Assignment',
  description: 'Create a NodeJS server with ExpressJS',
  due: '2021-10-10',
  completed: false,
  score: 0,
};

const module = {
  id: 1,
  name: 'Introduction to NodeJS',
  description: 'Learn the basics of NodeJS',
  course: 'CS5610',
};

export default function WorkingWithObjects(app) {
  /**
   * Get full assignment object
   * GET /lab5/assignment
   */
  app.get('/lab5/assignment', (req, res) => {
    res.json(assignment);
  });

  /**
   * Get assignment title
   * GET /lab5/assignment/title
   */
  app.get('/lab5/assignment/title', (req, res) => {
    res.json(assignment.title);
  });

  /**
   * Update assignment title
   * GET /lab5/assignment/title/:newTitle
   */
  app.get('/lab5/assignment/title/:newTitle', (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });

  /**
   * Update assignment score
   * GET /lab5/assignment/score/:newScore
   */
  app.get('/lab5/assignment/score/:newScore', (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseInt(newScore);
    res.json(assignment);
  });

  /**
   * Update assignment completed status
   * GET /lab5/assignment/completed/:status
   */
  app.get('/lab5/assignment/completed/:status', (req, res) => {
    const { status } = req.params;
    assignment.completed = status === 'true';
    res.json(assignment);
  });

  /**
   * Get full module object
   * GET /lab5/module
   */
  app.get('/lab5/module', (req, res) => {
    res.json(module);
  });

  /**
   * Get module name
   * GET /lab5/module/name
   */
  app.get('/lab5/module/name', (req, res) => {
    res.json(module.name);
  });

  /**
   * Update module name
   * GET /lab5/module/name/:newName
   */
  app.get('/lab5/module/name/:newName', (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  });

  /**
   * Update module description
   * GET /lab5/module/description/:newDescription
   */
  app.get('/lab5/module/description/:newDescription', (req, res) => {
    const { newDescription } = req.params;
    module.description = newDescription;
    res.json(module);
  });
}
