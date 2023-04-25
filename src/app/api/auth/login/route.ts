import { z } from "zod";
import { NextResponse } from "next/server";
import { makeAuthenticateUseCase } from "@/server/factories/make-authenticate-use-case";
import { InvalidCredentialsError } from "@/server/errors/invalid-credentials-error";

export async function POST(req: Request, res: Response) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const authenticateUseCase = makeAuthenticateUseCase();
  const request = await req.json();
  try {
    const { email, password } = registerBodySchema.parse(request);

    const { user } = await authenticateUseCase.execute({
      email: email,
      password: password,
    });

    return NextResponse.json(
      {
        message: user,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return NextResponse.json(
        {
          message: "Error authenticate user",
        },
        { status: 400 }
      );
    }
  }
}
