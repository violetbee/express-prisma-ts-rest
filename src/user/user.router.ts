import express from 'express';
import type { Request, Response } from 'express';
import { VALIDATE } from './types/client.types';
import * as UserService from './user.service';
import { hashPassword } from '../utils/hash';
import { USER_RESPONSES } from './user.response';
import { validationResult } from 'express-validator';

export const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await UserService.GetAllUsers();
    if (users!.length > 0) {
      res.status(200).json({ users, message: USER_RESPONSES.USER_GET_ALL });
    } else {
      res.status(404).json({ message: USER_RESPONSES.USER_NOT_FOUND });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

//Get User By Id
userRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserService.GetUserById(req.params.id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

//Create User
userRouter.post(
  '/',
  VALIDATE.createUser.map((validation) => validation),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      } else {
        const hashedPassword = hashPassword(req.body.password);
        const hashedUser = { ...req.body, password: hashedPassword };
        const result = await UserService.CreateNewUser(hashedUser);
        if (result) {
          //result is a boolean, if true, user is created, else, user is not created
          res.status(201).json({ message: USER_RESPONSES.USER_CREATED });
        } else {
          res.status(409).json({ message: USER_RESPONSES.USER_ALREADY_EXISTS });
        }
      }
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
);

//Update User
userRouter.put(
  '/:id',
  VALIDATE.updateUser.map((validation) => validation),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const updatedUser = await UserService.UpdateUser(req.params.id, req.body);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
);

//Delete User
userRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await UserService.DeleteUserById(req.params.id);
    res.status(200).json();
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});
