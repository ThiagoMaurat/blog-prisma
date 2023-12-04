import { z } from "zod";
import { NextResponse } from "next/server";
import { makeCreateThemeUseCase } from "@/server/factories/make-create-theme-use-case";

export async function POST(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string().nonempty(),
  });

  const themeUseCase = makeCreateThemeUseCase();
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
