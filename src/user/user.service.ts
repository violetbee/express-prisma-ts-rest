import { db } from '../utils/db.server';
import { Role } from '@prisma/client';
import type { Post } from '../post/post.types';
import type { CreateUser, ReadUser } from './types/server.types';
import { USER_RESPONSES } from './user.response';

//Experimental
export const GetAllUsers = async (): Promise<ReadUser[] | undefined> => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
        role: true,
        _count: {
          select: { ownedPost: true },
        },
      },
    });

    return users;
  } catch (error: any) {
    return error.message;
  }
};

export const GetUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        image: true,
      },
    });
    return user;
  } catch (error: any) {
    return error.message;
  }
};

//Creates a new user
export const CreateNewUser = async (user: CreateUser): Promise<boolean> => {
  try {
    const isUserExist = await db.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (isUserExist) {
      return false;
    } else {
      await db.user.create({
        data: user,
      });
      return true;
    }
  } catch (error: any) {
    return error.message;
  }
};

export const UpdateUser = async (id: string, user: ReadUser): Promise<void> => {
  try {
    await db.user.update({
      where: {
        id,
      },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        role: user.role as Role,
      },
    });
  } catch (error: any) {
    return error.message;
  }
};

export const DeleteUserById = async (id: string): Promise<void> => {
  try {
    await db.user.delete({
      where: {
        id,
      },
    });
  } catch (error: any) {
    return error.message;
  }
};
