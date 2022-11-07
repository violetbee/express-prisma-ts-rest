import { db } from '../utils/db.server';
import type { ReadUser } from '../user/types/server.types';
import jwt from 'jsonwebtoken';
import { isPasswordEqual } from '../utils/hash';

export type UserLogin = {
  email: string;
  password: string;
};

export const loginUser = async (
  authLogin: UserLogin
): Promise<string | null> => {
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
  if (!user) {
    return null;
  }
  if (!isPasswordEqual(hashedPassword!.password, password)) {
    return null;
  }

  const payload = {
    id: user?.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
  return token;
};
