"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import {
  CreatePostSchemaType,
  CreatePostTypeOutput,
  createPostSchema,
} from "./schema.";
import { revalidatePath } from "next/cache";
import { makePostUseCase } from "@/server/factories/make-post-use-case";

const handler = async (
  data: CreatePostSchemaType
): Promise<CreatePostTypeOutput> => {
  const postUseCase = makePostUseCase();

  const themes = await postUseCase.execute(data);

  revalidatePath("/admin");

  return {
    data: themes,
  };
};

export const createPostAction = createSafeAction(createPostSchema, handler);
