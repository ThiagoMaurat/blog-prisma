import { Prisma, User } from "@prisma/client";
import { randomUUID } from "crypto";
import { UserWithRoles, UsersRepository } from "../user-repository";

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = [];

  findByIdUserAndCheckIfAdmin(id: string): Promise<UserWithRoles | null> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: Prisma.UserCreateInput = {
      id: data.id ?? randomUUID(),
      email: data.email,
      password: data.password,
      name: data.name,
      created_at: new Date(),
      emailVerified: null,
      image: null,
    };

    this.items.push(user);

    return user;
  }
}
