import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as BookService from './book.service';

export const bookRouter = express.Router();

// GET: List All the books
bookRouter.get('/', async (req: Request, res: Response) => {
  try {
    const books = await BookService.listBooks();
    return res.status(200).json(books);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});

// GET: Get a Book by id
// Params: Id
bookRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  try {
    const book = await BookService.getBook(id);
    if (book) {
      return res.status(200).json(book);
    }
    return res.status(404).json({ msg: 'Book could not be found' });
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});

// POST: Create a Book
// Params: Title, isFiction, datePublished, authorId
bookRouter.post(
  '/',
  body('title').isString(),
  body('isFiction').isBoolean(),
  body('datePublished').isDate(),
  body('authorId').isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const book = req.body;
    try {
      const newBook = await BookService.createBook(book);
      return res.status(201).json(newBook);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  }
);

// PUT: Update a Book by Id
// Params: Title, datePublished, isFiction, authorId
bookRouter.put(
  '/id',
  body('title').isString(),
  body('isFiction').isBoolean(),
  body('datePublished').isDate(),
  body('authorId').isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const book = req.body;
    const id = parseInt(req.params.id, 10);
    try {
      const updatedBook = BookService.updateBook(book, id);
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  }
);

// DELETE: Delete a Book by Id
// Params: Id
bookRouter.delete('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  try {
    await BookService.deleteBook(id);
    return res.status(200).send({ msg: 'Book has been successfully deleted' });
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});
