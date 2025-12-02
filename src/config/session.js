/**
 * Session Configuration Middleware
 * Configures session based on environment
 */

import session from 'express-session';
import config from './environment.js';

export const configureSession = () => {
  const isProduction = config.server.env === 'production';
  
  console.log(`🔐 Session mode: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
  
  const sessionOptions = {
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      sameSite: isProduction ? 'none' : 'lax',
      secure: isProduction, // Only true in production (HTTPS)
    },
  };

  if (isProduction) {
    sessionOptions.proxy = true;
  }

  return session(sessionOptions);
};

export default configureSession;
