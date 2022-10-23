import { BookRead } from '../books/book.service';
import { db } from '../utils/db.server';

export type AuthorCreate = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type AuthorRead = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export const listAuthors = async (): Promise<AuthorRead[]> => {
  return db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });
};

export const getAuthor = async (id: number): Promise<AuthorRead | null> => {
  return db.author.findUnique({
    where: {
      id,
    },
  });
};

export const listBooksById = async (
  id: number
): Promise<Omit<BookRead, 'author'>[]> => {
  return db.book.findMany({
    where: {
      authorId: id,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
    },
  });
};

export const createAuthor = async (
  author: Omit<AuthorCreate, 'id'>
): Promise<AuthorCreate> => {
  const { firstName, lastName, email, password } = author;
  return db.author.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    },
  });
};

export const updateAuthor = async (
  author: Omit<AuthorCreate, 'id'>,
  id: number
): Promise<AuthorCreate> => {
  const { firstName, lastName, password } = author;
  return db.author.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
      password,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    },
  });
};

export const deleteAuthor = async (id: number): Promise<void> => {
  await db.author.delete({
    where: {
      id,
    },
  });
};
