import Link from "next/link";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { FindAllPostsOutput } from "@/server/repositories/post-repository";

interface CardProps {
  data: FindAllPostsOutput["posts"][0];
  href: string;
}

export function Card(props: CardProps) {
  const { data, href } = props;

  const { author, description, publishedAt, themes, thumbnail, title } = data;
  return (
    <Link href={href} prefetch={false} className="flex justify-center">
      <div className="max-w-[360px] hover:scale-105 transition-all duration-300  max-w-360 w-full gap-1 cursor-pointer flex flex-col">
        <Image
          className="object-cover rounded-2xl overflow-hidden"
          src={thumbnail}
          alt="image all posts"
          width={360}
          height={250}
        />

        <div className="font-weight-500 text-blue-300 text-1.2rem">
          {themes.map((theme, index) => {
            return (
              <p
                key={`theme-${index}`}
                className="font-weight-500 text-blue-300 text-1.2rem"
              >
                {theme.themes.name}
              </p>
            );
          })}
        </div>

        <p className="font-bold text-lg">{title}</p>

        <p className="text-gray-400 truncate font-weight-600 text-0.9rem">
          {description}
        </p>

        <div className="flex gap-3 items-center">
          <Image
            width={30}
            height={30}
            className="w-8 h-8 rounded-full"
            src="https://avatars.githubusercontent.com/u/76444984?v=4"
            alt="Thiago Maurat"
          />

          <div className="flex flex-col gap-2px">
            <p className="font-medium text-0.8rem">{author.name}</p>

            <p className="text-muted-foreground text-sm">
              {format(publishedAt, "dd/MM/yyyy, 'às' HH:mm.")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
