import { ActionState } from "@/lib/create-safe-action";
import { PostUseCaseResponse } from "@/server/use-cases/Posts/post";
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(10, { message: "Content is required" }),
  authorId: z.string().min(1, { message: "Author is required" }),
  thumbnail: z.string().url().min(1, { message: "Thumbnail is required" }),
  themeId: z.string().min(1, { message: "Theme is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  role: z.string().min(1, { message: "Role is required" }),
});

export type CreatePostSchemaType = z.infer<typeof createPostSchema>;
export type CreatePostTypeOutput = ActionState<
  CreatePostSchemaType,
  PostUseCaseResponse
>;
