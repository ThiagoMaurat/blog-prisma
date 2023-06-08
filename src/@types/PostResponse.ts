import { Theme } from "./ThemesResponse";

export interface PostResponse {
  content: string;
  title: string;
  thumbnail: string;
  description: string;
  id: string;
  themes: Theme[];
  author: {
    image: string | null;
    name: string | null;
  };
  publishedAt: string;
}
