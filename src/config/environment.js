/**
 * Environment Configuration
 * Centralized configuration for environment variables
 */

export const config = {
  server: {
    port: process.env.PORT || 4000,
    env: process.env.SERVER_ENV || 'development',
    url: process.env.SERVER_URL || 'localhost',
  },

  client: {
    url: process.env.CLIENT_URL || 'http://localhost:3000',
  },

  session: {
    secret: process.env.SESSION_SECRET || '8fe222800d823063384534f4a4d16a60',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, 
    },
  },

  cors: {
    credentials: true,
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
  },
};

export default config;
