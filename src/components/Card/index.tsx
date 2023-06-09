import Link from "next/link";
import Image from "next/image";
import React from "react";
import { PostResponse } from "@/@types/PostResponse";
import { format, parseISO } from "date-fns";

interface CardProps {
  data: PostResponse;
  href: string;
}

export function Card(props: CardProps) {
  const { data, href } = props;

  const { author, description, publishedAt, themes, thumbnail, title } = data;
  return (
    <Link href={href}>
      <div className="max-w-360 overflow-hidden w-full gap-1 cursor-pointer flex flex-col">
        <div className=" overflow-hidden">
          <Image
            className="object-cover rounded-xl"
            src={thumbnail}
            alt="image all posts"
            width={360}
            height={250}
          />
        </div>

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

        <p className="font-weight-bold text-darkblue-700 text-1.5rem">
          {title}
        </p>

        <p className="text-gray-600 font-weight-600 text-0.9rem">
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
            <p className="font-weight-bold text-darkblue-700 text-0.8rem">
              {author.name}
            </p>

            <p className="text-gray-900 text-0.7rem">
              {format(parseISO(publishedAt), "dd-MM-yyyy, 'às' HH:mm.")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
