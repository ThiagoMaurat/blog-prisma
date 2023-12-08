import { ListPostByIdResponse } from "@/server/use-cases/Posts/listPostById";
import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";

interface CustomSectionTitlePostPage {
  post: ListPostByIdResponse;
  className?: string;
}

export const CustomSectionTitlePostPage = (
  props: CustomSectionTitlePostPage
) => {
  const { author, publishedAt, themes, title } = props.post;

  const titleSection = clsx(
    "flex",
    "bg-blue-900",
    "flex-col",
    "md:flex-row",
    props.className
  );

  return (
    <div className={titleSection}>
      <div className="flex text-center md:text-left flex-col min-w-[162px] flex-start overflow-hidden w-full max-w-[100%] md:max-w-[60%]">
        {themes.map((theme, index) => (
          <p
            key={`theme-index-${index}`}
            className="font-semibold text-blue-300 text-lg w-full"
          >
            {theme.themes.name}
          </p>
        ))}

        <h1 className="text-white font-bold text-3xl">{title}</h1>
      </div>

      <div className="flex items-center gap-2 justify-center md:justify-normal">
        <Image
          className="w-10 h-10 rounded-full"
          width={50}
          height={50}
          src="https://avatars.githubusercontent.com/u/76444984?v=4"
          alt="Avatar"
        />

        <div className="flex flex-col gap-1">
          <p className="font-bold text-white text-sm">{author.name}</p>

          <p className="text-white text-xs">
            {format(publishedAt, "dd/MM/yyyy, 'às' HH:mm.")}
          </p>
        </div>
      </div>
    </div>
  );
};
