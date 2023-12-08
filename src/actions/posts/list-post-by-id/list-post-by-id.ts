"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { ListPostByIdOutput, ListPostByIdType, listPostById } from "./schema.";
import { makeListPostByIdUseCase } from "@/server/factories/make-list-post-by-id-use-case";

const handler = async (data: ListPostByIdType): Promise<ListPostByIdOutput> => {
  const postUseCase = makeListPostByIdUseCase();

  const posts = await postUseCase.execute(data);

  return {
    data: posts,
  };
};

export const listPostByIdAction = createSafeAction(listPostById, handler);
