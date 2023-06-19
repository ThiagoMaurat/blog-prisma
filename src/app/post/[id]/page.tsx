import Image from "next/image";
import React from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Limiter } from "@/components/Limiter";
import { getPostsById } from "@/queries/getPostsById";
import { CustomSectionTitlePostPage } from "@/components/CustomSectionTitlePostPage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface PostsProps {
  params: {
    id: string;
  };
}

export default async function Posts({ params }: PostsProps) {
  const { id } = params;

  const { post } = await getPostsById({
    id: id,
  });

  return (
    <Limiter>
      <Header />

      <CustomSectionTitlePostPage
        post={post}
        className="min-h-[30vh] h-auto rounded-3xl flex md:justify-evenly md:items-center pt-4 md:pt-12 pb-16 px-8 mx-auto gap-8 justify-around"
      />

      <div className="w-700 h-500 flex mt-[-4rem] justify-center w-full">
        <Image
          className="rounded-xl"
          width={700}
          height={500}
          src={post.thumbnail}
          alt="post blog image"
        />
      </div>

      <main className="py-8">
        <ReactMarkdown
          className="font-normal text-xl from-neutral-800 markdown w-full break-words "
          remarkPlugins={[remarkGfm]}
        >
          {post.content}
        </ReactMarkdown>
      </main>

      <Footer />
    </Limiter>
  );
}
