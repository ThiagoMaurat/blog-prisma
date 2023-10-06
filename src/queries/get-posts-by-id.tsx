import { Post } from "@/@types/PostResponse";
import { makeFetch } from "../helpers/makeFetch";

interface getPostsByIdProps {
  id: string;
}

export const getPostsById = async (params: getPostsByIdProps) => {
  const fetchUrl = `/api/posts/${params.id}`;

  const post = await makeFetch<{ post: Post }>(fetchUrl, {
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  });

  return post;
};
