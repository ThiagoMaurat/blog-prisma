import { InvalidCredentialsError } from "@/server/errors/invalid-credentials-error";
import { InvalidUpdateUserEmailError } from "@/server/errors/invalid-update-email-error";
import { UserIsAlreadyVerifiedError } from "@/server/errors/user-is-already-verified";
import { UsersRepository } from "@/server/repositories/user-repository";

type ValidateCodeEmailInput = {
  code: string;
  email: string;
};

export type ValidateCodeOutput = {
  code: string;
  email: string;
};

export class ValidateCodeEmail {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    code,
    email,
  }: ValidateCodeEmailInput): Promise<ValidateCodeOutput> {
    const isUserAndCodeValid =
      await this.userRepository.findUserAndCheckTheEmailCode(code, email);

    if (!isUserAndCodeValid) {
      throw new InvalidCredentialsError();
    }

    if (!!isUserAndCodeValid.emailVerified) {
      throw new UserIsAlreadyVerifiedError();
    }

    const updateUser = await this.userRepository.updateUser(
      {
        emailVerified: new Date(),
      },
      isUserAndCodeValid.id
    );

    if (!updateUser) {
      throw new InvalidUpdateUserEmailError();
    }

    return {
      code: code,
      email: email,
    };
  }
}
