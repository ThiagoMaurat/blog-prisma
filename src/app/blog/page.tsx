import { debounce, first, last, orderBy, tail } from "lodash";
import { makeFetch } from "@/lib/makeFetch";
import { Themes } from "@prisma/client";
import { Limiter } from "@/components/Limiter";
import { Header } from "@/components/Header";
import { FieldSearch } from "@/components/FieldSearch/inde";
import { ButtonTheme } from "@/components/ButtonTheme";
import FirstCard from "@/components/FirstCard";
import { Footer } from "@/components/Footer";
import { PostResponse } from "@/@types/PostResponse";
import { Theme, ThemeResponse } from "@/@types/ThemesResponse";

export default async function BlogPage() {
  const { posts } = await makeFetch<{ posts: PostResponse[] }>(
    "/api/posts/all",
    {
      cache: "no-store",
    }
  );

  const { themes } = await makeFetch<{ themes: Theme[] }>("/api/themes/all", {
    cache: "no-cache",
  });

  const firstPost = first(posts);
  console.log(posts);
  // const [loadedPosts, setLoadedPosts] = useState(6);
  // const [search, setSearch] = useState("");
  // const [query, setQuery] = useState("");

  // const visiblePosts = posts.slice(0, loadedPosts);

  // const loadMorePosts = useCallback(() => {
  //   setLoadedPosts((prev) => prev + 6);
  // }, []);

  // const debouncedSearch = React.useMemo(
  //   () =>
  //     debounce((val) => {
  //       setQuery(val);
  //     }, 1500),
  //   [setQuery]
  // );

  // const handleChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearch(e.target.value);
  //     debouncedSearch(e.target.value);
  //   },
  //   [debouncedSearch]
  // );

  return (
    <Limiter>
      <Header />

      <div className="rounded-3xl overflow-hidden">
        <div className="bg-[url(/blog.svg)] bg-no-repeat bg-center bg-cover h-[140px] md:h-[200px]" />
      </div>

      <div className="items-center flex w-full justify-center relative bottom-8">
        <FieldSearch
          name="fieldsearch"
          // onChange={handleChange}
          // value={search}
        />
      </div>

      <div className="flex gap-2 justify-center">
        {themes?.map((themes, index) => {
          return (
            <ButtonTheme key={`themesButton-${index}`}>
              {themes.name}
            </ButtonTheme>
          );
        })}
      </div>

      {firstPost && (
        <div className="my-8 hidden lg:flex">
          <FirstCard
            key={"1"}
            href={`/post/${firstPost?.id}`}
            data={firstPost}
          />
        </div>
      )}

      {/* <SimpleGrid
        mx={{ base: "1rem", sm: "0px" }}
        justifyItems={"center"}
        gap={"3rem"}
        columns={{ base: 1, md: 2, xl: 3 }}
        mb="2rem"
        mt={{ base: "2rem", lg: "none" }}
      >
        {posts?.map((posts, index) => {
          return (
            <Card
              key={`card-posts${index}`}
              image={posts.thumbnail}
              theme={posts.themes ?? []}
              title={posts.title ?? ""}
              description={posts.description ?? ""}
              author={posts.author.name ?? ""}
              date={format(
                posts?.publishedAt ?? new Date(),
                "dd-MM-yyyy, 'às' HH:mm."
              )}
              href={`/post/${posts.id}`}
            />
          );
        })}
      </SimpleGrid> */}

      {/* {!data.allPosts.error && search.length > 3 && (
        <SimpleGrid
          mx={{ base: "1rem", sm: "0px" }}
          justifyItems={"center"}
          gap={"3rem"}
          columns={{ base: 1, md: 2, xl: 3 }}
          mb="2rem"
          mt={{ base: "2rem", lg: "none" }}
        >
          {searchData &&
            searchData?.map((posts, index) => {
              return (
                <Card
                  key={`card-posts${index}`}
                  image={posts.thumbnail.thumbnail_url}
                  theme={posts.theme.theme}
                  title={posts.title ?? "Front-End Developer Blog"}
                  description={
                    posts.description ?? "Saiba mais sobre a matéria."
                  }
                  author={posts.author ?? "Thiago Maurat"}
                  date={format(
                    new Date(posts.created_at),
                    "dd-MM-yyyy, 'às' HH:mm."
                  )}
                  href={`/post/${posts.id}`}
                />
              );
            })}
        </SimpleGrid>
      )} */}

      {/* {loadedPosts < orderedData.length && !(search.length > 3) && (
        <HStack justifyContent={"center"} mt="3rem">
          <ButtonTheme onClick={loadMorePosts}>Carregar mais</ButtonTheme>
        </HStack>
      )} */}

      <Footer />
    </Limiter>
  );
}
