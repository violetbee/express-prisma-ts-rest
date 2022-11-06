import { db } from '../utils/db.server';
import { Category } from './category.types';

export const GetCategories = async (): Promise<Category[]> => {
  try {
    return await db.category.findMany({
      include: {
        _count: {
          select: { post: true },
        },
      },
    });
  } catch (error: any) {
    return error.message;
  }
};

export const CreateCategory = async (category: Category) => {
  try {
    return await db.category.create({
      data: category,
    });
  } catch (error: any) {
    return error.message;
  }
};

export const UpdateCategory = async (
  id: string,
  category: Category
): Promise<string> => {
  try {
    await db.category.update({
      where: {
        id,
      },
      data: category,
    });
    return 'Category updated successfully';
  } catch (error: any) {
    return error.message;
  }
};

export const DeleteCategory = async (id: string) => {
  try {
    await db.category.delete({
      where: {
        id,
      },
    });
  } catch (error: any) {
    return error.message;
  }
};
