import { PostResponse } from "@/@types/PostResponse";
import { makeFetch } from "./makeFetch";

interface getPostsProps {
  search?: string;
  page?: number;
  limit?: number;
}

export const getPosts = async (params: getPostsProps) => {
  const searchParam = params?.search ? `&search=${params.search}` : "";

  const paginationParams = `?page=${params.page}&limit=${params.limit}`;

  const fetchUrl = `/api/posts/all${paginationParams}${searchParam}`;

  const posts = await makeFetch<PostResponse>(fetchUrl, {
    cache: "no-cache",
    // next: {
    //   revalidate: 60,
    // },
  });

  return posts.posts;
};
