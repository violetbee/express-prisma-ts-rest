import { body, validationResult } from 'express-validator';

export const VALIDATE = {
  updateUser: [
    body('firstName').isString(),
    body('lastName').isString(),
    body('email').isEmail(),
    body('image').isString(),
    body('role').isString(),
  ],
  createUser: [
    body('firstName').isString(),
    body('lastName').isString(),
    body('email').isEmail(),
    body('image').isString(),
    body('password').isString(),
  ],
};
