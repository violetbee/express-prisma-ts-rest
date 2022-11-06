import { Post } from '../../post/post.types';

export type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
};

export type ReadUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  role?: string;
};
