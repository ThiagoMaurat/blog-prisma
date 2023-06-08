// "use client";
// import { Box, Flex, HStack, SimpleGrid } from "@chakra-ui/react";
// import React, { useCallback, useMemo, useState } from "react";
// import { Header } from "../components/Header";
// import { FieldSearch } from "../components/FieldSearch/inde";
// import { ButtonTheme } from "../components/ButtonTheme";
// import { Card } from "../components/Card";
// import { Limiter } from "../components/Limiter";
// import { format } from "date-fns";
// import FirstCard from "../components/FirstCard";
// import { debounce, first, last, orderBy, tail } from "lodash";
// import { Footer } from "../components/Footer";
// import { makeFetch } from "@/lib/makeFetch";
// import { Post, Themes } from "@prisma/client";
// import { PostDTO } from "@/server/repositories/post-repository";

// export default async function BlogPage() {
//   const posts = await makeFetch<PostDTO[]>("/api/posts/all");

//   const themes = await makeFetch<Themes[]>("/api/themes/all");

//   // const [loadedPosts, setLoadedPosts] = useState(6);
//   // const [search, setSearch] = useState("");
//   // const [query, setQuery] = useState("");

//   // const visiblePosts = posts.slice(0, loadedPosts);

//   // const loadMorePosts = useCallback(() => {
//   //   setLoadedPosts((prev) => prev + 6);
//   // }, []);

//   // const debouncedSearch = React.useMemo(
//   //   () =>
//   //     debounce((val) => {
//   //       setQuery(val);
//   //     }, 1500),
//   //   [setQuery]
//   // );

//   // const handleChange = useCallback(
//   //   (e: React.ChangeEvent<HTMLInputElement>) => {
//   //     setSearch(e.target.value);
//   //     debouncedSearch(e.target.value);
//   //   },
//   //   [debouncedSearch]
//   // );

//   return (
//     <Limiter>
//       <Header />

//       <Box borderRadius={"24px"} overflow="hidden">
//         <Box
//           backgroundImage={"url(./blog.svg)"}
//           bgRepeat="no-repeat"
//           h={{ base: "140px", md: "200px" }}
//           backgroundSize={"1200px auto"}
//           backgroundPosition={"center center"}
//         />
//       </Box>
//       <Flex
//         w="100%"
//         alignItems={"center"}
//         justifyContent={"center"}
//         position={"relative"}
//         bottom="30px"
//       >
//         <FieldSearch
//           name="fieldsearch"
//           // onChange={handleChange}
//           // value={search}
//         />
//       </Flex>

//       <Flex gap={"0.5rem"} justifyContent="center">
//         {themes.map((themes, index) => {
//           return (
//             <ButtonTheme key={`themesButton-${index}`}>
//               {themes.name}
//             </ButtonTheme>
//           );
//         })}
//       </Flex>

//       <Flex my="2rem" display={{ base: "none", lg: "flex" }}>
//         {[first(posts)]?.map((lastItem) => {
//           return (
//             <FirstCard
//               key={"1"}
//               thumbnail={lastItem?.thumbnail ?? ""}
//               theme={lastItem?.themes ?? []}
//               title={lastItem?.title ?? ""}
//               description={lastItem?.description ?? ""}
//               author={lastItem?.author.name ?? "Thiago Maurat"}
//               href={`/post/${lastItem?.id}`}
//               date={format(
//                 lastItem?.publishedAt ?? new Date(),
//                 "dd-MM-yyyy, 'às' HH:mm."
//               )}
//             />
//           );
//         })}
//       </Flex>

//       <SimpleGrid
//         mx={{ base: "1rem", sm: "0px" }}
//         justifyItems={"center"}
//         gap={"3rem"}
//         columns={{ base: 1, md: 2, xl: 3 }}
//         mb="2rem"
//         mt={{ base: "2rem", lg: "none" }}
//       >
//         {posts?.map((posts, index) => {
//           return (
//             <Card
//               key={`card-posts${index}`}
//               image={posts.thumbnail}
//               theme={posts.themes ?? []}
//               title={posts.title ?? ""}
//               description={posts.description ?? ""}
//               author={posts.author.name ?? ""}
//               date={format(
//                 posts?.publishedAt ?? new Date(),
//                 "dd-MM-yyyy, 'às' HH:mm."
//               )}
//               href={`/post/${posts.id}`}
//             />
//           );
//         })}
//       </SimpleGrid>

//       {/* {!data.allPosts.error && search.length > 3 && (
//         <SimpleGrid
//           mx={{ base: "1rem", sm: "0px" }}
//           justifyItems={"center"}
//           gap={"3rem"}
//           columns={{ base: 1, md: 2, xl: 3 }}
//           mb="2rem"
//           mt={{ base: "2rem", lg: "none" }}
//         >
//           {searchData &&
//             searchData?.map((posts, index) => {
//               return (
//                 <Card
//                   key={`card-posts${index}`}
//                   image={posts.thumbnail.thumbnail_url}
//                   theme={posts.theme.theme}
//                   title={posts.title ?? "Front-End Developer Blog"}
//                   description={
//                     posts.description ?? "Saiba mais sobre a matéria."
//                   }
//                   author={posts.author ?? "Thiago Maurat"}
//                   date={format(
//                     new Date(posts.created_at),
//                     "dd-MM-yyyy, 'às' HH:mm."
//                   )}
//                   href={`/post/${posts.id}`}
//                 />
//               );
//             })}
//         </SimpleGrid>
//       )} */}

//       {/* {loadedPosts < orderedData.length && !(search.length > 3) && (
//         <HStack justifyContent={"center"} mt="3rem">
//           <ButtonTheme onClick={loadMorePosts}>Carregar mais</ButtonTheme>
//         </HStack>
//       )} */}

//       <Footer />
//     </Limiter>
//   );
// }
