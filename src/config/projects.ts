export type ProjectsSliderProps = {
  href: string;
  title: string;
  pathWhite: string;
  pathDark: string;
  description: string;
};

export const ThiagoDevProject: ProjectsSliderProps[] = [
  {
    href: "/projects/1",
    description: "Project 1",
    title: "Project 1",
    pathWhite: "/Slider/blog-project/blog-white.png",
    pathDark: "/Slider/blog-project/blog-dark.png",
  },
  {
    href: "/projects/2",
    description: "Project 2",
    title: "Project 2",
    pathWhite: "/Slider/blog-project/blog-login-white.png",
    pathDark: "/Slider/blog-project/blog-login-dark.png",
  },
];
