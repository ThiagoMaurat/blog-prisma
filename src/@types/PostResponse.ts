interface Themes {
  themes: {
    id: number;
    name: string;
  };
}

export interface PostResponse {
  content: string;
  title: string;
  thumbnail: string;
  description: string;
  id: string;
  themes: Themes[];
  author: {
    image: string | null;
    name: string | null;
  };
  publishedAt: string;
}
