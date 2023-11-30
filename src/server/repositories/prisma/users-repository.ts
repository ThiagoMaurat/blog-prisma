import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../user-repository";
import { UserIsNotAdminError } from "@/server/errors/user-is-not-admin-error";

export class PrismaUsersRepository implements UsersRepository {
  async updateUser(
    data: Prisma.UserUpdateInput,
    id: string
  ): Promise<User | null> {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findUserAndCheckTheEmailCode(
    code: string,
    email: string
  ): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        emailCodeVerified: code,
      },
    });

    if (!user) return null;

    return user;
  }

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
            role: {
              select: {
                name: true,
              },
            },
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
