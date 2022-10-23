import bcrypt from 'bcryptjs';
import { db } from './db.server';

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const isPasswordEqual = (
  password: string,
  hashedPassword: string
): boolean => {
  const isEqual = bcrypt.compareSync(hashedPassword, password);
  return isEqual;
};
