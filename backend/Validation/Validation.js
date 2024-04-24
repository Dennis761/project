import { body } from 'express-validator';

export const UserValidator = [
    body('email')
        .isEmail().withMessage('Invalid email format'),
    body('name')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long')
        .matches(/^[a-zA-Z\s]*$/).withMessage('Name can only contain letters and spaces'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    body('country').optional()
        .isLength({ min: 2 }).withMessage('Country must be at least 2 characters long')
        .matches(/^[a-zA-Z\s]*$/).withMessage('Country can only contain letters and spaces')
];

export const LoginValidator = [
    body('email')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

export const ProductValidator = [
    body('title')
        .trim()
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),

    body('description')
        .trim()
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),

    body('aboutProduct')
        .optional()
        .trim()
        .isLength({ min: 10 }).withMessage('About product must be at least 10 characters long'),

    body('imagesURL')
        .optional().withMessage('Please upload an image'),

    body('location')
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage('Location must be at least 3 characters long'),

    body('country')
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage('Country must be at least 3 characters long'),

    body('price')
        .optional()
        .isNumeric().withMessage('Price must be a valid number')
];
