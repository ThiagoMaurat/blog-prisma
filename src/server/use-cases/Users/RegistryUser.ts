import { hash } from "bcryptjs";
import { User } from "@prisma/client";
import { UserAlreadyExistsError } from "@/server/errors/user-already-exists";
import { UsersRepository } from "@/server/repositories/user-repository";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.createUser({
      name,
      email,
      password: password_hash,
    });

    return { user };
  }
}
