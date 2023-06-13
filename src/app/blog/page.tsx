import { Limiter } from "@/components/Limiter";
import { Header } from "@/components/Header";
import { FirstCard } from "@/components/FirstCard";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";
import SearchComponent from "./SearchComponent";
import { getPosts } from "@/helpers/getPosts";
import ShowMore from "./ShowMore";

interface BlogPageProps {
  searchParams: {
    search: string;
    page: number;
    limit: number;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { posts, total } = await getPosts({
    search: searchParams.search,
    page: searchParams.page || 1,
    limit: searchParams.limit || 9,
  });

  return (
    <Limiter>
      <Header />

      <SearchComponent />

      {posts && (
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

      <ShowMore
        limit={searchParams.limit || 9}
        page={searchParams.page || 1}
        total={total}
        search={searchParams.search}
      />

      <Footer />
    </Limiter>
  );
}
