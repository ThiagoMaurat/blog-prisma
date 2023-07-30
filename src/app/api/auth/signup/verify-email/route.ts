import { ZodError, z } from "zod";
import { NextResponse } from "next/server";
import { InvalidCredentialsError } from "@/server/errors/invalid-credentials-error";
import { InvalidUpdateUserEmailError } from "@/server/errors/invalid-update-email-error";
import { ValidateCodeEmail } from "@/server/use-cases/Authenticate/ValidateCodeEmail";

export async function POST(req: Request, res: Response) {
  const validateCodeEmail = new ValidateCodeEmail();

  const request = await req.json();

  const authSignUpSchemaWithouthConfirmPassword = z.object({
    code: z.string(),
    email: z.string().email(),
  });

  try {
    const { email, code } =
      authSignUpSchemaWithouthConfirmPassword.parse(request);

    await validateCodeEmail.execute({
      code,
      email,
    });

    return NextResponse.json(
      {
        message: "Email confirmado",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return NextResponse.json(
        {
          message: "Código ou email inválido",
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

    if (error instanceof InvalidUpdateUserEmailError) {
      return NextResponse.json(
        {
          message: "Erro ao confirmar email",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
