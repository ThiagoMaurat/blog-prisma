import { Box, Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { GetStaticProps } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import React from "react";
import { CustomSectionTitlePostPage } from "../../components/CustomSectionTitlePostPage";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Limiter } from "../../components/Limiter";

export default function Posts({ data }: Props) {
  if (data) {
    return (
      <Limiter>
        <Header />

        <CustomSectionTitlePostPage
          theme={data.theme.theme ?? "Sem tema"}
          title={data.title ?? "Sem título"}
          date={format(Date.parse(data.created_at), "dd-MM-yyyy") ?? "Sem data"}
          author={data.author ?? "Sem autor"}
          minH="30vh"
          h="auto"
          borderRadius={"3xl"}
          justifyContent={{ base: "unset", md: "space-evenly" }}
          alignItems={{ base: "center", md: "flex-start" }}
          pt={{ base: "1rem", md: "3rem" }}
          pb="80px"
          px={{ base: "2rem", md: "2rem" }}
          mx={"0 auto"}
          gap={{ base: "1.5rem", md: "2rem" }}
        >
          <h2>{JSON.stringify(data)}</h2>
        </CustomSectionTitlePostPage>

        <Flex mt="-4rem" justifyContent={"center"} w="100%">
          <Image
            width={700}
            height={500}
            src={data.thumbnail.thumbnail_url}
            alt={"post blog image"}
            style={{ borderRadius: "15px" }}
          />
        </Flex>

        <Box
          px={"2rem"}
          mt="2rem"
          mx="0 auto"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></Box>

        <Footer />
      </Limiter>
    );
  }
}

export async function getStaticPaths() {
  const { data: postsData } = (await supabase.from("posts").select(
    `author, title, content, created_at, description, id,
          thumbnail:thumbnails(id, thumbnail_url),
          theme:themes(id, theme)`
  )) as PostData;

  const paths = [];

  if (postsData?.length) {
    for (let i = 0; i < postsData?.length; i++) {
      paths.push({ params: { id: `${i + 1}` } });
    }
  }

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const id = Number(params?.id);

  const { data: postsData, error: error } = (await supabase
    .from("posts")
    .select(
      `author, title, content, created_at, description, id,
          thumbnail:thumbnails(id, thumbnail_url),
          theme:themes(id, theme)`
    )) as PostData;

  const data = postsData?.find((post) => post.id === id);

  return {
    props: {
      data: data,
      error: error,
    },
  };
};
