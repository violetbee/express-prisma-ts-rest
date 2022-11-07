import express from 'express';
import type { Request, Response } from 'express';
import * as PostService from './post.service';
import { checkAuth, IGetUserAuthInfoRequest } from '../middleware/checkAuth';

export const postRouter = express.Router();

postRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await PostService.GetPosts();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

postRouter.post(
  '/',
  checkAuth,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const userId = JSON.parse(JSON.stringify(req.user)).id;
    try {
      const post = await PostService.CreateNewPost(req.body, userId);
      if (post) {
        res.status(201).json('Post created successfully');
      } else {
        res.status(400).json('Post not created');
      }
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
);
