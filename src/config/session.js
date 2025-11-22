/**
 * Session Configuration Middleware
 * Configures session based on environment
 */

import session from 'express-session';
import config from './environment.js';

export const configureSession = () => {
  const sessionOptions = {
    secret: config.session.secret,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized,
  };

  if (config.server.env !== 'development') {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: 'none',
      secure: true,
      domain: config.server.url,
    };
  }

  return session(sessionOptions);
};

export default configureSession;
