import { z } from "zod";
import { NextResponse } from "next/server";
import { makePostUseCase } from "@/server/factories/make-post-use-case";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exist";
import { UserIsNotAdminError } from "@/server/errors/user-is-not-admin-error";

export async function POST(req: Request, res: Response) {
  const registerBodySchema = z.object({
    title: z.string(),
    content: z.string().min(10).min(1),
    authorId: z.string().min(1).min(1),
    thumbnail: z.string().url().min(1),
    themeId: z.any(),
    description: z.string().min(10).min(1),
  });

  const postUseCase = makePostUseCase();
  const request = await req.json();

  try {
    const { authorId, content, title, description, themeId, thumbnail } =
      registerBodySchema.parse(request);

    await postUseCase.execute({
      authorId,
      content,
      title,
      thumbnail,
      themeId,
      description,
    });

    return NextResponse.json(
      {
        message: "Post created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof UserDoesNotExistsError) {
      return NextResponse.json(
        {
          message: "User does not exist",
        },
        { status: 400 }
      );
    }

    if (error instanceof UserIsNotAdminError) {
      return NextResponse.json(
        {
          message: "User is not admin",
        },
        { status: 400 }
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Error on payload validation",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
