import { compare } from "bcryptjs";
import { UsersRepository } from "@/server/repositories/user-repository";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exist";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export type AuthenticateUserCaseOutput = {
  user: {
    id: User["id"];
    name: User["name"];
    email: User["email"];
    emailVerified: User["emailVerified"];
    image: User["image"];
    created_at: User["created_at"];
    role: string;
  };
};

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUserCaseOutput> {
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
        created_at: user.created_at,
        emailVerified: user.emailVerified,
        image: user.image,
        role: user.UserRole[0].role.name,
      },
    };
  }
}
