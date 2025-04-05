import Joi from 'joi';

export const validateUserCreate = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().pattern(/^[a-zA-Z\s]*$/).required().messages({
      'string.pattern.base': 'Full name can only contain alphabetic characters and spaces',
      'any.required': 'Full name is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({
      'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required'
    }),
    type: Joi.string().valid('admin', 'employee').required().messages({
      'any.only': 'User type must be either "admin" or "employee"',
      'any.required': 'User type is required'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateUserUpdate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),
    fullName: Joi.string().pattern(/^[a-zA-Z\s]*$/).messages({
      'string.pattern.base': 'Full name can only contain alphabetic characters and spaces'
    }),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).messages({
      'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
    }),
    type: Joi.string().valid('admin', 'employee').messages({
      'any.only': 'User type must be either "admin" or "employee"'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateUserDelete = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}; 