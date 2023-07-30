import { hash } from "bcryptjs";
import { Prisma, User } from "@prisma/client";
import { UserAlreadyExistsError } from "@/server/errors/user-already-exists";
import { UsersRepository } from "@/server/repositories/user-repository";

interface RegisterUseCaseRequest {
  data: Prisma.UserCreateInput;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    data,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    if (!data.password || !data.email) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(data.password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(
      data.email
    );

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.createUser({
      email: data.email,
      name: data.name,
      password: password_hash,
      birthday: data.birthday,
    });

    return { user };
  }
}
