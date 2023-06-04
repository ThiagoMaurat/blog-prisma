import { z } from "zod";
import { NextResponse } from "next/server";
import { makePostUseCase } from "@/server/factories/make-post-use-case";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exist";
import { UserIsNotAdminError } from "@/server/errors/user-is-not-admin-error";

export async function POST(req: Request, res: Response) {
  const registerBodySchema = z.object({
    title: z.string(),
    content: z.string().min(20).nonempty(),
    authorId: z.string().min(1).nonempty(),
  });

  const postUseCase = makePostUseCase();
  const request = await req.json();

  try {
    const { authorId, content, title } = registerBodySchema.parse(request);

    await postUseCase.execute({
      authorId,
      content,
      title,
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
        message: "Error creating post",
      },
      { status: 500 }
    );
  }
}
