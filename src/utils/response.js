/**
 * Response Utilities
 * Standardized API response formats
 */

export const successResponse = (data, message = 'Success', statusCode = 200) => {
  return {
    success: true,
    message,
    data,
    statusCode,
  };
};

export const errorResponse = (message = 'Error', statusCode = 500, errors = null) => {
  return {
    success: false,
    message,
    statusCode,
    ...(errors && { errors }),
  };
};

export const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json(successResponse(data, message, statusCode));
};

export const sendError = (res, message = 'Error', statusCode = 500, errors = null) => {
  return res.status(statusCode).json(errorResponse(message, statusCode, errors));
};

export default {
  successResponse,
  errorResponse,
  sendSuccess,
  sendError,
};
