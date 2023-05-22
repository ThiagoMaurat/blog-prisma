import { prisma } from "@/lib/prisma";
import { Prisma, Role, User } from "@prisma/client";
import { UsersRepository } from "../user-repository";
import { UserIsNotAdminError } from "@/server/errors/user-is-not-admin-error";
import { randomUUID } from "crypto";

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

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        UserRole: {
          include: {
            role: true,
          },
        },
      },
    });

    return user;
  }

  async createUser(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        ...data,
        UserRole: {
          create: {
            role: {
              connectOrCreate: {
                where: { name: "admin" },
                create: { name: "admin" },
              },
            },
          },
        },
      },
      include: {
        UserRole: true,
      },
    });

    return user;
  }
}
