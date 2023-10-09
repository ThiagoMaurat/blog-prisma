import { ThemeResponse } from "@/@types/ThemesResponse";
import { makeFetch } from "../helpers/makeFetch";

interface GetThemes {
  search?: string;
  page?: number;
  limit?: number;
}

export const getThemes = async (params?: GetThemes) => {
  const searchParam = params?.search ? `&search=${params.search}` : "";

  const paginationParams =
    params?.page || params?.limit
      ? `?page=${params.page}&limit=${params.limit}`
      : "";

  const fetchUrl = `/api/themes/all${paginationParams}${searchParam}`;

  const themes = await makeFetch<ThemeResponse>(fetchUrl, {
    next: { tags: ["theme"] },
    cache: "no-cache",
  });

  return themes;
};
