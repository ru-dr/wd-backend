/**
 * Authentication Middleware
 * Protects routes that require authentication
 */

export const requireAuth = (req, res, next) => {
  const currentUser = req.session?.currentUser;
  
  if (!currentUser) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  req.user = currentUser;
  next();
};

export const optionalAuth = (req, res, next) => {
  const currentUser = req.session?.currentUser;
  if (currentUser) {
    req.user = currentUser;
  }
  next();
};

export default { requireAuth, optionalAuth };
