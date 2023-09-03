import { PostResponse } from "@/@types/PostResponse";
import { makeFetch } from "../helpers/makeFetch";

interface getPostsProps {
  search?: string;
  page?: number;
  limit?: number;
}

export const getThemes = async (params?: getPostsProps) => {
  const searchParam = params?.search ? `&search=${params.search}` : "";

  const paginationParams =
    params?.page || params?.limit
      ? `?page=${params.page}&limit=${params.limit}`
      : "";

  const fetchUrl = `/api/themes/all${paginationParams}${searchParam}`;

  const themes = await makeFetch<PostResponse>(fetchUrl, {
    next: {
      revalidate: 60,
    },
  });

  return themes;
};
