import { first } from "lodash";
import { makeFetch } from "@/lib/makeFetch";
import { Limiter } from "@/components/Limiter";
import { Header } from "@/components/Header";
import { FieldSearch } from "@/components/FieldSearch/inde";
import { FirstCard } from "@/components/FirstCard";
import { Footer } from "@/components/Footer";
import { PostResponse } from "@/@types/PostResponse";
import { Card } from "@/components/Card";
import { DefaultButton } from "@/components/DefaultButton";
import { BsSend } from "react-icons/bs";
import { IoArrowForwardSharp, IoSend } from "react-icons/io5";

export default async function BlogPage() {
  const getPosts = async (search?: string) => {
    const posts = await makeFetch<{ posts: PostResponse[] }>(`/api/post/all`, {
      cache: "no-store",
    });

    return posts;
  };

  const { posts } = await getPosts();
  const firstPost = first(posts);

  const fetchPostBySearch = async (search: string) => {
    "use server";
  };
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

      {firstPost && (
        <div className="my-8 hidden lg:flex">
          <FirstCard
            key={"1"}
            href={`/post/${firstPost?.id}`}
            data={firstPost}
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
