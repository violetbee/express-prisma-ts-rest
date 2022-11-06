import { db } from '../utils/db.server';
import type { ReadUser } from '../user/types/server.types';
import jwt from 'jsonwebtoken';
import { isPasswordEqual } from '../utils/hash';

export type AuthorLogin = {
  email: string;
  password: string;
};

export const loginAuthor = async (
  authLogin: AuthorLogin
): Promise<ReadUser | void | null> => {
  const { email, password } = authLogin;
  const hashedPassword = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      password: true,
    },
  });
  const user = await db.user.findUnique({
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
  if (isPasswordEqual(hashedPassword!.password, password)) {
    return user as ReadUser;
  }
};
