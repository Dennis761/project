import { body } from 'express-validator';

export const createUserValidator = [
    body('name', 
        'Name must be at least 2 letters long! \n Name can only contain letters and spaces!')
        .isLength({ min: 2 }) 
        .matches(/^[a-zA-Z\s]*$/), 
    body('email', 'Invalid email format!').isEmail(), 

    body('country', 
        'Country must be at least 2 characters long! \n Country can only contain letters and spaces!')
        .isLength({ min: 2 }) 
        .matches(/^[a-zA-Z\s]*$/), 

    body('password', 
        'Password must be at least 8 characters long! \n Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!')
        .isLength({ min: 8 }) 
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
];

export const productValidator = [
    body('title', 'Title must be at least 3 characters long')
        .trim()
        .isLength({ min: 3 }),

    body('description', 'Description must be at least 10 characters long')
        .trim()
        .isLength({ min: 10 }),

    body('aboutProduct', 'About product must be at least 10 characters long')
        .optional()
        .trim()
        .isLength({ min: 10 }),

    body('imageURL', 'Please upload an image')
        .optional(),

    body('location', 'Location must be at least 3 characters long')
        .optional()
        .trim()
        .isLength({ min: 3 }),

    body('country', 'Country must be at least 3 characters long')
        .optional()
        .trim()
        .isLength({ min: 3 }),

    body('price', 'Price must be a valid number')
        .optional()
        .isNumeric()
];
