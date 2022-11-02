import { Post } from '../../post/post.types';

export type CreateUser = {
  id: string;
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

export type PostsByUser = {
  posts: Post[];
};
