import { db } from '../utils/db.server';
import type { AuthorRead } from '../author/author.service';
import jwt from 'jsonwebtoken';
import { isPasswordEqual } from '../utils/hash';

export type AuthorLogin = {
  email: string;
  password: string;
};

export const loginAuthor = async (
  authLogin: AuthorLogin
): Promise<AuthorRead | void | null> => {
  const { email, password } = authLogin;
  const hashedPassword = await db.author.findUnique({
    where: {
      email,
    },
    select: {
      password: true,
    },
  });
  const user = await db.author.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });
  // console.log(isPasswordEqual(hashedPassword!.password, password));
  if (isPasswordEqual(hashedPassword!.password, password)) {
    return user;
  }
};
