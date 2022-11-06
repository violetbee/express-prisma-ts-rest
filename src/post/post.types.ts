export type Post = {
  id: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
};

export type PostUpdate = {
  updatePost: Post;
  published?: boolean;
};

export type CreatePost = {
  id: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  category: string;
  authorId: string;
};

export type Comment = {
  id: string;
  content: string;
};
