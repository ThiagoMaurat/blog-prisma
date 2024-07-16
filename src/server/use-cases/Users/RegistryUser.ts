import { hash } from "bcryptjs";
import { Prisma, User } from "@prisma/client";
import { UserAlreadyExistsError } from "@/server/errors/user-already-exists";
import { UsersRepository } from "@/server/repositories/user-repository";
import { randomUUID } from "crypto";
import { render } from "@react-email/render";
import LinearLoginCodeEmail from "@/email-templates/auth-confirm-email";
import { SendEmailUseCase } from "../SendEmail/SendEmail";
interface RegisterUseCaseInput {
  data: Prisma.UserCreateInput;
}

export interface RegisterUseCaseOutput {
  user: User;
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private sendEmailUseCase: SendEmailUseCase
  ) {}

  async execute({
    data,
  }: RegisterUseCaseInput): Promise<RegisterUseCaseOutput> {
    if (!data.password || !data.email) {
      throw new UserAlreadyExistsError();
    }

    const emailCode = randomUUID();
    const password_hash = await hash(data.password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(
      data.email
    );

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const emailHtml = render(
      LinearLoginCodeEmail({
        validationCode: emailCode,
        email: data.email,
      }),
      {
        pretty: true,
      }
    );

    const emailSent = await this.sendEmailUseCase.execute({
      html: emailHtml,
      subject: "Confirmação de Cadastro",
      to: data.email,
    });

    if (emailSent.status !== "sent") {
      throw new Error("Email not sent");
    }

    const user = await this.usersRepository.createUser({
      email: data.email,
      name: data.name,
      password: password_hash,
      birthday: data.birthday,
      emailCodeVerified: emailCode,
    });

    return { user };
  }
}
