import { ActionState } from "@/lib/create-safe-action";
import { FindAllPostsOutput } from "@/server/repositories/post-repository";
import { z } from "zod";

export const listAllPosts = z.object({
  page: z.coerce.number().optional().nullable(),
  limit: z.coerce.number().optional().nullable(),
  search: z.string().optional().nullable(),
});

export type ListAllPostsType = z.infer<typeof listAllPosts>;
export type ListAllPostsOutput = ActionState<
  ListAllPostsType,
  FindAllPostsOutput
>;
