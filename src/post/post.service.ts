import { db } from '../utils/db.server';
import { CreatePost, Post, PostUpdate } from './post.types';

export const GetPosts = async (): Promise<Post[]> => {
  try {
    const posts = await db.post.findMany();
    return posts;
  } catch (error: any) {
    return error.message;
  }
};

export const GetPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
      },
    });
    return post;
  } catch (error: any) {
    return error.message;
  }
};

export const GetPostsByUserId = async (id: string): Promise<Post[]> => {
  try {
    const posts = await db.post.findMany({
      where: {
        author: {
          id,
        },
      },
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        published: true,
      },
    });
    return posts;
  } catch (error: any) {
    return error.message;
  }
};

export const UpdatePost = async (
  id: string,
  post: PostUpdate
): Promise<void> => {
  try {
    await db.post.update({
      where: {
        id,
      },
      data: {
        title: post.updatePost.title,
        content: post.updatePost.content,
        slug: post.updatePost.slug,
        published: post.published,
      },
    });
  } catch (error: any) {
    return error.message;
  }
};

export const CreateNewPost = async (post: CreatePost): Promise<boolean> => {
  try {
    const isPostExist = await db.post.findUnique({
      where: {
        slug: post.slug,
      },
    });
    if (isPostExist) {
      return false;
    } else {
      await db.post.create({
        data: {
          title: post.title,
          content: post.content,
          slug: post.slug,
          published: post.published,
          category: {
            connect: {
              slug: post.category,
            },
          },
          author: {
            connect: {
              id: post.authorId,
            },
          },
        },
      });
      return true;
    }
  } catch (error: any) {
    return error.message;
  }
};
