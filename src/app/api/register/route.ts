import { z } from "zod";
import { NextResponse } from "next/server";
import { makeRegisterUseCase } from "@/server/factories/make-register-use-case";
import { UserAlreadyExistsError } from "@/server/errors/user-already-exists";

export async function POST(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const registerUseCase = makeRegisterUseCase();
  const request = await req.json();
  try {
    const { email, name, password } = registerBodySchema.parse(request);

    await registerUseCase.execute({
      name: name,
      email: email,
      password: password,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Error creating user",
      },
      { status: 500 }
    );
  }
}
