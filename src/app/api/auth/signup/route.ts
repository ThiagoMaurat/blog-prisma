import { ZodError, z } from "zod";
import { NextResponse } from "next/server";
import { UserAlreadyExistsError } from "@/server/errors/user-already-exists";
import { authSignUpSchema } from "@/components/Forms/singup/schema";
import { makeRegisterUseCase } from "@/server/factories/make-register-use-case";

export async function POST(req: Request, res: Response) {
  const registerUseCase = makeRegisterUseCase();

  const request = await req.json();

  try {
    const { email, name, password, birthday } = authSignUpSchema.parse(request);

    await registerUseCase.execute({
      data: {
        name,
        email,
        password,
        birthday,
      },
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
          message: "Usuário existente, favor logar.",
        },
        { status: 400 }
      );
    }

    if (error instanceof ZodError) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Credenciais inválidas",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: error,
      },
      { status: 400 }
    );
  }
}
