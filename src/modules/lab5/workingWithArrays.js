/**
 * Lab 5 - Working With Arrays
 * Routes for array manipulation (CRUD operations)
 */

// Helper function to generate random 5-character alphanumeric ID
function generateId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

let todos = [
  { id: generateId(), title: 'Task 1', completed: false },
  { id: generateId(), title: 'Task 2', completed: true },
  { id: generateId(), title: 'Task 3', completed: false },
  { id: generateId(), title: 'Task 4', completed: true },
];

export default function WorkingWithArrays(app) {
  
  // ============================================================================
  // GET ROUTES - Must be in specific order (specific → general)
  // ============================================================================
  
  /**
   * Create new todo (GET method for lab)
   * GET /lab5/todos/create
   */
  app.get('/lab5/todos/create', (req, res) => {
    const newTodo = {
      id: generateId(),
      title: 'New Task',
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });

  /**
   * Delete todo by ID (GET method for lab)
   * GET /lab5/todos/:id/delete
   */
  app.get('/lab5/todos/:id/delete', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === id);
    
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
   * Update todo title (GET method for lab)
   * GET /lab5/todos/:id/title/:title
   */
  app.get('/lab5/todos/:id/title/:title', (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === id);
    
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
   * Update todo completed status (GET method for lab)
   * GET /lab5/todos/:id/completed/:completed
   */
  app.get('/lab5/todos/:id/completed/:completed', (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === id);
    
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
   * Get todo by ID
   * GET /lab5/todos/:id
   * IMPORTANT: This MUST come AFTER all specific routes
   */
  app.get('/lab5/todos/:id', (req, res) => {
    const { id } = req.params;
    
    console.log(`[GET /lab5/todos/:id] Fetching todo with ID: ${id}`);
    
    // Prevent treating 'completed' as an ID
    if (id === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID. Use query parameter: /lab5/todos?completed=true',
      });
    }
    
    console.log(`[GET /lab5/todos/:id] Current todos:`, todos);
    
    const todo = todos.find((t) => t.id === id);
    
    if (!todo) {
      console.log(`[GET /lab5/todos/:id] Todo not found with ID: ${id}`);
      return res.status(404).json({
        success: false,
        message: `Todo with ID ${id} not found`,
      });
    }
    
    console.log(`[GET /lab5/todos/:id] Found todo:`, todo);
    res.json(todo);
  });

  /**
   * Get all todos or filter by completed status
   * GET /lab5/todos
   * GET /lab5/todos?completed=true
   */
  app.get('/lab5/todos', (req, res) => {
    const { completed } = req.query;
    
    console.log(`[GET /lab5/todos] Query params:`, req.query);
    console.log(`[GET /lab5/todos] Total todos:`, todos.length);
    
    if (completed !== undefined) {
      const completedBool = completed === 'true';
      const filteredTodos = todos.filter((t) => t.completed === completedBool);
      console.log(`[GET /lab5/todos] Filtered ${filteredTodos.length} completed todos`);
      return res.json(filteredTodos);
    }
    
    res.json(todos);
  });

  // ============================================================================
  // RESTful ROUTES (POST, PUT, DELETE)
  // ============================================================================

  /**
   * Create new todo (POST method)
   * POST /lab5/todos
   */
  app.post('/lab5/todos', (req, res) => {
    const newTodo = {
      ...req.body,
      id: generateId(),
    };
    todos.push(newTodo);
    console.log(`[POST /lab5/todos] Created new todo:`, newTodo);
    res.json(newTodo);
  });

  /**
   * Update todo (PUT method)
   * PUT /lab5/todos/:id
   */
  app.put('/lab5/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Unable to update Todo with ID: ${id}`,
      });
    }
    
    todos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, ...req.body };
      }
      return t;
    });
    
    console.log(`[PUT /lab5/todos/:id] Updated todo with ID: ${id}`);
    res.sendStatus(200);
  });

  /**
   * Delete todo by ID (DELETE method)
   * DELETE /lab5/todos/:id
   */
  app.delete('/lab5/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Unable to delete Todo with ID: ${id}`,
      });
    }
    
    todos.splice(todoIndex, 1);
    console.log(`[DELETE /lab5/todos/:id] Deleted todo with ID: ${id}`);
    res.sendStatus(200);
  });
}
