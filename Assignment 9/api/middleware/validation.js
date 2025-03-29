import { body, validationResult } from 'express-validator';

const validateUserCreate = [
    body('fullName')
        .trim()
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Full name should only contain alphabetic characters'),
    
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email address'),
    
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        next();
    }
];

const validateUserUpdate = [
    body('fullName')
        .optional()
        .trim()
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Full name should only contain alphabetic characters'),
    
    body('password')
        .optional()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        next();
    }
];

export { validateUserCreate, validateUserUpdate }; 