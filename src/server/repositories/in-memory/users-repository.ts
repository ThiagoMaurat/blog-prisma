import { Prisma, User } from "@prisma/client";
import { randomUUID } from "crypto";
import { UsersRepository } from "../in-memory-user-repository";

export class InMemoryCheckInsRepository implements UsersRepository {
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      email: data.email,
      password: data.password,
      name: data.name,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
