import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UserWithRoles, UsersRepository } from "../user-repository";

export class PrismaUsersRepository implements UsersRepository {
  findByIdUserAndCheckIfAdmin(id: string): Promise<UserWithRoles | null> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        ...data,
        roles: {
          connect: [{ name: "reader" }],
        },
        UserRole: {
          create: {
            role: {
              connect: {
                name: "reader",
              },
            },
          },
        },
      },
    });

    return user;
  }
}
