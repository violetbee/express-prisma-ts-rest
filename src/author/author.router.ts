import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as AuthorService from './author.service';

export const authorRouter = express.Router();

// GET: List of all Authors
authorRouter.get('/', async (req: Request, res: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return res.status(200).json(authors);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});

// GET: A single author by ID
authorRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const author = await AuthorService.getAuthor(id);
    if (author) {
      return res.status(200).json(author);
    }
    return res.status(404).json({ msg: 'Author could not be found' });
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});

// GET: Get list of Books by User id
// Params: Id
authorRouter.get('/:id/books', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  try {
    const booksById = await AuthorService.listBooksById(id);
    if (booksById) {
      return res.status(200).json(booksById);
    }
    return res
      .status(404)
      .json({ msg: "Couldn't find any books related with id" });
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});

// POST: Create a Author
// Params: firstName, lastName
authorRouter.post(
  '/',
  body('firstName').isString(),
  body('lastName').isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const author = req.body;
      const newAuthor = await AuthorService.createAuthor(author);
      return res.status(201).json(newAuthor);
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  }
);

// PUT: Updating an Author
// Params: firstName, lastName
authorRouter.put(
  '/:id',
  body('firstName').isString(),
  body('lastName').isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(req.params.id, 10);
    try {
      const author = req.body;
      const updatedAuthor = await AuthorService.updateAuthor(author, id);
      return res.status(200).json(updatedAuthor);
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  }
);

// DELETE: Delete and Author
// Params: Id
authorRouter.delete('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  try {
    await AuthorService.deleteAuthor(id);
    return res.status(204).json('Author has been successfully deleted');
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});
