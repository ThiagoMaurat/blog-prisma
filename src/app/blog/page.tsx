import { Limiter } from "@/components/Limiter";
import { Header } from "@/components/Header";
import { FirstCard } from "@/components/FirstCard";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";
import ShowMore from "../../components/ShowMore";
import { Metadata } from "next/types";
import SearchComponent from "@/components/SearchComponent";
import { tail } from "lodash";
import { listAllPostsdAction } from "@/actions/posts/list-all/list-all";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog de Thiago Maurat para desenvolvimento web full stack",
  keywords: [
    "Nextjs",
    "Front-End",
    "Portfólio",
    "Blog",
    "Back-end",
    "Desenvolvedor",
    "React",
    "JavaScript",
    "TypeScript",
  ],
  authors: [
    {
      name: "Thiago Maurat",
      url: "https://github.com/thiagomaurat",
    },
  ],
};

interface BlogPageProps {
  searchParams: {
    search: string;
    page: number;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { data } = await listAllPostsdAction({
    search: searchParams.search,
    page: searchParams.page || 1,
    limit: 9,
  });

  return (
    <Limiter>
      <Header />

      <SearchComponent />

      {data?.posts && (
        <div className="my-8 hidden lg:flex">
          <FirstCard
            key={`posts${data.posts?.[0]?.id}`}
            href={`/post/${data.posts?.[0]?.id}`}
            data={data.posts?.[0]}
          />
        </div>
      )}

      <div className="mx-1 sm:mx-0 grid py-4 items-center justify-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-2rem mt-2rem lg:mt-0">
        {tail(data?.posts)?.map((post, index) => (
          <Card
            key={`card-posts${index}`}
            data={post}
            href={`/post/${post.id}`}
          />
        ))}
      </div>

      <ShowMore
        limit={9}
        page={searchParams.page || 1}
        total={data?.total || 0}
        search={searchParams.search && searchParams.search}
      />

      <Footer />
    </Limiter>
  );
}
