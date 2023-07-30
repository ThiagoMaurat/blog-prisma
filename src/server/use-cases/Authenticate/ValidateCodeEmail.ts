import { prisma } from "@/lib/prisma";
import { InvalidCredentialsError } from "@/server/errors/invalid-credentials-error";
import { InvalidUpdateUserEmailError } from "@/server/errors/invalid-update-email-error";

interface ValidateCodeEmailRequest {
  code: string;
  email: string;
}

type AuthenticateUserCaseResponse = {
  code: string;
};

export class ValidateCodeEmail {
  constructor() {}

  async execute({
    code,
    email,
  }: ValidateCodeEmailRequest): Promise<AuthenticateUserCaseResponse> {
    const isEqual = await prisma.user.findFirst({
      where: {
        email: email,
        emailCodeVerified: code,
      },
    });

    if (!isEqual) {
      throw new InvalidCredentialsError();
    }

    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    if (!user) {
      throw new InvalidUpdateUserEmailError();
    }

    return {
      code,
    };
  }
}
