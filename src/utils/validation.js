/**
 * Validation Utilities
 * Common validation functions
 */

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

export const isValidUsername = (username) => {
  // At least 3 characters, alphanumeric and underscore only
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  return usernameRegex.test(username);
};

export const validateRequired = (fields, data) => {
  const errors = {};
  
  fields.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      errors[field] = `${field} is required`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  isValidEmail,
  isValidPassword,
  isValidUsername,
  validateRequired,
};
