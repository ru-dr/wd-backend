/**
 * CORS Middleware Configuration
 * Handles Cross-Origin Resource Sharing
 */

import cors from 'cors';
import config from '../config/environment.js';

export const corsMiddleware = cors(config.cors);

export default corsMiddleware;
