import { NextResponse } from "next/server";
import { makePostUseCase } from "@/server/factories/make-post-use-case";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exist";
import { UserIsNotAdminError } from "@/server/errors/user-is-not-admin-error";

export async function GET(req: Request, res: Response) {
  const postUseCase = makePostUseCase();

  try {
    const allPosts = await postUseCase.listAll();

    if (!allPosts) {
      return NextResponse.json(
        {
          message: "Posts not found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ posts: allPosts }, { status: 200 });
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

    return NextResponse.json(
      {
        message: "Error creating post",
      },
      { status: 500 }
    );
  }
}
