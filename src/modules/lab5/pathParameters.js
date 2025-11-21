/**
 * Lab 5 - Path Parameters
 * Routes for arithmetic operations using path parameters
 */

export default function PathParameters(app) {
  /**
   * Add two numbers
   * GET /lab5/add/:a/:b
   */
  app.get('/lab5/add/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.json(sum);
  });

  /**
   * Subtract two numbers
   * GET /lab5/subtract/:a/:b
   */
  app.get('/lab5/subtract/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const difference = parseInt(a) - parseInt(b);
    res.json(difference);
  });

  /**
   * Multiply two numbers
   * GET /lab5/multiply/:a/:b
   */
  app.get('/lab5/multiply/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const product = parseInt(a) * parseInt(b);
    res.json(product);
  });

  /**
   * Divide two numbers
   * GET /lab5/divide/:a/:b
   */
  app.get('/lab5/divide/:a/:b', (req, res) => {
    const { a, b } = req.params;
    if (parseInt(b) === 0) {
      return res.status(400).json({ error: 'Cannot divide by zero' });
    }
    const quotient = parseInt(a) / parseInt(b);
    res.json(quotient);
  });
}
