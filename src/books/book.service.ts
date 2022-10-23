import { db } from '../utils/db.server';
import type { AuthorRead } from '../author/author.service';

export type BookRead = {
  id: number;
  title: string;
  datePublished: Date;
  isFiction: boolean;
  author: AuthorRead;
  // authorId: number;
};

type BookWrite = {
  title: string;
  datePublished: Date;
  isFiction: boolean;
  authorId: number;
};

export const listBooks = async (): Promise<BookRead[]> => {
  return db.book.findMany({
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
};

export const getBook = async (id: number): Promise<BookRead | null> => {
  return db.book.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      isFiction: true,
      datePublished: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
};

export const createBook = async (book: BookWrite): Promise<BookRead> => {
  const { title, isFiction, datePublished, authorId } = book;
  const parsedData: Date = new Date(datePublished);
  return await db.book.create({
    data: {
      title,
      isFiction,
      datePublished: parsedData,
      authorId,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
};

export const updateBook = async (
  book: BookWrite,
  id: number
): Promise<BookRead> => {
  const { title, datePublished, isFiction, authorId } = book;
  const updatedBook = await db.book.update({
    where: {
      id,
    },
    data: {
      title,
      isFiction,
      datePublished,
      authorId,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
  return updatedBook;
};

export const deleteBook = async (id: number): Promise<void> => {
  await db.book.delete({
    where: {
      id,
    },
  });
};
