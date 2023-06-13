interface Themes {
  themes: {
    id: number;
    name: string;
  };
}

export interface Post {
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

export interface PostResponse {
  posts: {
    total: number;
    page: number;
    limit: number;
    posts: Post[];
  };
}
