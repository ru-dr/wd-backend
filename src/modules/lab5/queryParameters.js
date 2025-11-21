/**
 * Lab 5 - Query Parameters
 * Routes for arithmetic operations using query parameters
 */

export default function QueryParameters(app) {
  /**
   * Calculator with query parameters
   * GET /lab5/calculator?operation=add&a=5&b=3
   */
  app.get('/lab5/calculator', (req, res) => {
    const { a, b, operation } = req.query;
    
    if (!a || !b || !operation) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters: a, b, and operation',
      });
    }

    const numA = parseInt(a);
    const numB = parseInt(b);
    let result = 0;

    switch (operation) {
      case 'add':
        result = numA + numB;
        break;
      case 'subtract':
        result = numA - numB;
        break;
      case 'multiply':
        result = numA * numB;
        break;
      case 'divide':
        if (numB === 0) {
          return res.status(400).json({
            success: false,
            message: 'Cannot divide by zero',
          });
        }
        result = numA / numB;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid operation. Use: add, subtract, multiply, or divide',
        });
    }

    res.json(result);
  });
}
