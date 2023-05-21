import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UserWithRoles, UsersRepository } from "../user-repository";
import { UserIsNotAdminError } from "@/server/errors/user-is-not-admin-error";

export class PrismaUsersRepository implements UsersRepository {
  async findByIdUserAndCheckIfAdmin(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
        UserRole: {
          some: {
            role: {
              name: {
                equals: "admin",
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UserIsNotAdminError();
    }

    return user;
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

  async createUser(data: Prisma.UserCreateInput) {
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
