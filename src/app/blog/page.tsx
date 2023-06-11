import { Limiter } from "@/components/Limiter";
import { Header } from "@/components/Header";
import { FirstCard } from "@/components/FirstCard";
import { Footer } from "@/components/Footer";
import { PostResponse } from "@/@types/PostResponse";
import { Card } from "@/components/Card";
import { makeFetch } from "@/helpers/makeFetch";
import SearchComponent from "./SearchComponent";

interface BlogPageProps {
  searchParams: {
    search: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { posts } = await makeFetch<{ posts: PostResponse[] }>(
    `/api/posts/all${
      searchParams.search ? `?search=${searchParams.search}` : ""
    }`,
    {
      cache: "no-store",
    }
  );

  return (
    <Limiter>
      <Header />

      <SearchComponent />

      {posts?.[0] && (
        <div className="my-8 hidden lg:flex">
          <FirstCard
            key={`posts${posts?.[0]?.id}`}
            href={`/post/${posts?.[0]?.id}`}
            data={posts?.[0]}
          />
        </div>
      )}

      <div className="mx-1 sm:mx-0 grid py-4 items-center justify-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-2rem mt-2rem lg:mt-0">
        {posts?.map((post, index) => (
          <Card
            key={`card-posts${index}`}
            data={post}
            href={`/post/${post.id}`}
          />
        ))}
      </div>

      {/* {loadedPosts < orderedData.length && !(search.length > 3) && (
        <HStack justifyContent={"center"} mt="3rem">
          <ButtonTheme onClick={loadMorePosts}>Carregar mais</ButtonTheme>
        </HStack>
      )} */}

      <Footer />
    </Limiter>
  );
}
