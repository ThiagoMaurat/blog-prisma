import { NextResponse } from "next/server";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exist";
import { UserIsNotAdminError } from "@/server/errors/user-is-not-admin-error";
import { z } from "zod";
import { makeThemeUseCase } from "@/server/factories/make-theme-use-case";

export async function GET(req: Request, res: Response) {
  const themeUseCase = makeThemeUseCase();

  const queryParams = new URL(req.url).searchParams;

  const pageParams = queryParams.get("page");
  const limitParams = queryParams.get("limit");

  const paginationSchema = z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
  });

  try {
    const { limit, page } = await paginationSchema.parseAsync({
      page: pageParams,
      limit: limitParams,
    });

    const allThemes = await themeUseCase.findAll(page, limit);

    return NextResponse.json({ themes: allThemes }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Error on query params",
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
