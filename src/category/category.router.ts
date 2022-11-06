import express from 'express';
import type { Request, Response } from 'express';
import * as CategoryService from './category.service';

export const categoryRouter = express.Router();

categoryRouter.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await CategoryService.GetCategories();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

categoryRouter.post('/', async (req: Request, res: Response) => {
  try {
    const category = await CategoryService.CreateCategory(req.body);
    res.status(201).json('Category created successfully');
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

categoryRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await CategoryService.DeleteCategory(req.params.id);
    res.status(200).json('Category deleted successfully');
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});
