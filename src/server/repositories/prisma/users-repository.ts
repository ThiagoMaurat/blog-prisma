import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../user-repository";
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
                where: { name: "reader" },
                create: { name: "reader" },
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
