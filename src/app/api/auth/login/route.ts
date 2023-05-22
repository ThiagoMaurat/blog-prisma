import { z } from "zod";
import { NextResponse } from "next/server";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exist";
import { makeAuthenticateUseCase } from "@/server/factories/make-authenticate-use-case";

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
      email,
      password,
    });

    return NextResponse.json(
      {
        user: user,
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

    return NextResponse.json(
      {
        message: "Error on login",
      },
      { status: 500 }
    );
  }
}
