/**
 * Lab 5 - Working With Arrays
 * Routes for array manipulation (CRUD operations)
 */

let todos = [
  { id: 1, title: 'Task 1', completed: false, description: 'First task' },
  { id: 2, title: 'Task 2', completed: true, description: 'Second task' },
  { id: 3, title: 'Task 3', completed: false, description: 'Third task' },
  { id: 4, title: 'Task 4', completed: true, description: 'Fourth task' },
];

export default function WorkingWithArrays(app) {


  /**
   * Create new todo (GET method for lab)
   * GET /lab5/todos/create
   * NOTE: This MUST be before /lab5/todos/:id
   */
  app.get('/lab5/todos/create', (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: 'New Task',
      completed: false,
      description: 'New task description',
    };
    todos.push(newTodo);
    res.json(todos);
  });

  /**
   * Get all todos or filter by completed status
   * GET /lab5/todos?completed=true
   * NOTE: This MUST be before /lab5/todos/:id
   */
  app.get('/lab5/todos', (req, res) => {
    const { completed } = req.query;
    
    if (completed !== undefined) {
      const completedBool = completed === 'true';
      const filteredTodos = todos.filter((t) => t.completed === completedBool);
      return res.json(filteredTodos);
    }
    
    res.json(todos);
  });

  /**
   * Update todo title (GET method for lab)
   * GET /lab5/todos/:id/title/:title
   * NOTE: Specific paths like /title/ must come before generic /:id
   */
  app.get('/lab5/todos/:id/title/:title', (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Unable to update Todo with ID: ${id}`,
      });
    }
    
    todo.title = title;
    res.json(todos);
  });

  /**
   * Update todo description (GET method for lab)
   * GET /lab5/todos/:id/description/:description
   */
  app.get('/lab5/todos/:id/description/:description', (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Unable to update Todo with ID: ${id}`,
      });
    }
    
    todo.description = description;
    res.json(todos);
  });

  /**
   * Update todo completed status (GET method for lab)
   * GET /lab5/todos/:id/completed/:completed
   */
  app.get('/lab5/todos/:id/completed/:completed', (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Unable to update Todo with ID: ${id}`,
      });
    }
    
    todo.completed = completed === 'true';
    res.json(todos);
  });

  /**
   * Delete todo by ID (GET method for lab)
   * GET /lab5/todos/:id/delete
   */
  app.get('/lab5/todos/:id/delete', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Unable to delete Todo with ID: ${id}`,
      });
    }
    
    todos.splice(todoIndex, 1);
    res.json(todos);
  });

  /**
   * Get todo by ID
   * GET /lab5/todos/:id
   * NOTE: This MUST come AFTER all specific routes like /create, /delete, etc.
   */
  app.get('/lab5/todos/:id', (req, res) => {
    const { id } = req.params;
    
    
    if (id === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID. Use query parameter instead: /lab5/todos?completed=true',
      });
    }
    
    const todo = todos.find((t) => t.id === parseInt(id));
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo with ID ${id} not found`,
      });
    }
    
    res.json(todo);
  });

  /**
   * Create new todo (POST method)
   * POST /lab5/todos
   */
  app.post('/lab5/todos', (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  });

  /**
   * Update todo (PUT method)
   * PUT /lab5/todos/:id
   */
  app.put('/lab5/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Unable to update Todo with ID: ${id}`,
      });
    }
    
    todos = todos.map((t) => {
      if (t.id === parseInt(id)) {
        return { ...t, ...req.body };
      }
      return t;
    });
    
    res.sendStatus(200);
  });

  /**
   * Delete todo by ID (DELETE method)
   * DELETE /lab5/todos/:id
   */
  app.delete('/lab5/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Unable to delete Todo with ID: ${id}`,
      });
    }
    
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  });
}
