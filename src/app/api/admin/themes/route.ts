import { z } from "zod";
import { NextResponse } from "next/server";
import { makeThemeUseCase } from "@/server/factories/make-theme-use-case";
import { getToken } from "next-auth/jwt";

export async function POST(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string().nonempty(),
  });

  const themeUseCase = makeThemeUseCase();
  const request = await req.json();

  try {
    const { name } = registerBodySchema.parse(request);

    await themeUseCase.execute({
      name,
    });

    return NextResponse.json(
      {
        message: "Theme created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
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
        message: "Error creating theme",
      },
      { status: 500 }
    );
  }
}
