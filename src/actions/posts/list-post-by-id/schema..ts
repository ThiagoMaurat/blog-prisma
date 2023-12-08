import { ActionState } from "@/lib/create-safe-action";
import { ListPostByIdResponse } from "@/server/use-cases/Posts/listPostById";
import { z } from "zod";

export const listPostById = z.object({
  id: z.string().min(1, { message: "Post id is required" }),
});

export type ListPostByIdType = z.infer<typeof listPostById>;
export type ListPostByIdOutput = ActionState<
  ListPostByIdType,
  ListPostByIdResponse
>;
