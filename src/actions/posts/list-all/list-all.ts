"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { ListAllPostsOutput, ListAllPostsType, listAllPosts } from "./schema.";
import { makeListAllPostUseCase } from "@/server/factories/make-list-all-posts-use-case";

const handler = async (data: ListAllPostsType): Promise<ListAllPostsOutput> => {
  const listAllPosts = makeListAllPostUseCase();

  const posts = await listAllPosts.execute(data);

  return {
    data: posts,
  };
};

export const listAllPostsdAction = createSafeAction(listAllPosts, handler);
