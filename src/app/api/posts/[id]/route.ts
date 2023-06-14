import { NextResponse } from "next/server";
import { makePostUseCase } from "@/server/factories/make-post-use-case";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exist";
import { UserIsNotAdminError } from "@/server/errors/user-is-not-admin-error";
import { z } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const postUseCase = makePostUseCase();

  const paginationSchema = z.object({
    id: z.string().nonempty("Post id is required"),
  });

  try {
    const { id } = await paginationSchema.parseAsync({
      id: params.id,
    });

    const allPosts = await postUseCase.findById(id);

    return NextResponse.json({ post: allPosts }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: error,
        },
        { status: 400 }
      );
    }

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

    return NextResponse.json(
      {
        message: "Error listing posts",
      },
      { status: 500 }
    );
  }
}
