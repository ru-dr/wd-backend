/**
 * Request Logger Middleware
 * Logs all incoming requests
 */

export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${url} - ${ip}`);

  next();
};

export default requestLogger;
