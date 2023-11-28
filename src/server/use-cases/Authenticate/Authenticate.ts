import { compare } from "bcryptjs";
import { User, UserRole } from "@prisma/client";
import { InvalidCredentialsError } from "@/server/errors/invalid-credentials-error";
import { UsersRepository } from "@/server/repositories/user-repository";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exist";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserCase = Omit<
  | (User & {
      UserRole: UserRole[];
    })
  | null,
  "password"
>;

export type AuthenticateUserCaseResponse = {
  user: AuthenticateUserCase;
};

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUserCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.password) {
      throw new UserDoesNotExistsError();
    }

    const doesPasswordMatches = await compare(password, user.password);

    if (!doesPasswordMatches) {
      throw new Error("Password does not match");
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        created_at: user.created_at,
      },
    };
  }
}
