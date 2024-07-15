import Image from "next/image";
import React from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Limiter } from "@/components/Limiter";
import { CustomSectionTitlePostPage } from "@/components/CustomSectionTitlePostPage";
import { listPostByIdAction } from "@/actions/posts/list-post-by-id/list-post-by-id";
import Editor from "@/components/Editor/advanced-editor";
interface PostsProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PostsProps) {
  const { data } = await listPostByIdAction({
    id: params.id,
  });

  return {
    title: `Post - ${data?.title}`,
    description: `Descrição - ${data?.description}`,
    openGraph: {
      title: `Post - ${data?.title}`,
      description: `Descrição - ${data?.description}`,
    },
  };
}

export default async function Posts({ params }: PostsProps) {
  const { id } = params;

  const { data } = await listPostByIdAction({
    id: id,
  });

  return (
    <Limiter>
      <Header />

      <CustomSectionTitlePostPage
        post={data!}
        className="min-h-[30vh] h-auto rounded-3xl flex md:justify-evenly md:items-center pt-4 md:pt-12 pb-16 px-8 mx-auto gap-8 justify-around"
      />

      <div className="w-700 h-500 mb-4 flex mt-[-4rem] justify-center w-full">
        <Image
          className="rounded-xl"
          width={700}
          height={500}
          src={data!.thumbnail}
          alt="post blog image"
        />
      </div>

      <Editor
        initialContent={data?.content && JSON.parse(data?.content)}
        editable={false}
      />
      <Footer />
    </Limiter>
  );
}
