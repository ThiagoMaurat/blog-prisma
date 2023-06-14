import { Post } from "@/@types/PostResponse";
import { makeFetch } from "../helpers/makeFetch";

interface getPostsByIdProps {
  id: string;
}

export const getPostsById = async (params: getPostsByIdProps) => {
  const fetchUrl = `/api/posts/${params.id}`;

  const post = await makeFetch<{ post: Post }>(fetchUrl, {
    cache: "no-cache",
  });

  return post;
};
