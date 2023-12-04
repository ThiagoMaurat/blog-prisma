import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/server/repositories/user-repository";
import { randomUUID } from "crypto";
import { Account, User } from "next-auth";

interface AuthenticateExternalProviderUseCaseInput {
  email: string;
  accountExternalAuthProvider?: Account;
  userExternalAuthProvider?: User;
}

export class AuthenticateExternalProvider {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    accountExternalAuthProvider,
    userExternalAuthProvider,
  }: AuthenticateExternalProviderUseCaseInput) {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      return Promise.resolve(true);
    }

    if (!existingUser && accountExternalAuthProvider) {
      const createUser = await prisma.user.create({
        data: {
          name: userExternalAuthProvider?.name,
          email: userExternalAuthProvider?.email,
          image: userExternalAuthProvider?.image,
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
          emailVerified: new Date(),
          Account: {
            create: {
              provider: accountExternalAuthProvider?.provider,
              providerAccountId: accountExternalAuthProvider?.providerAccountId,
              type: accountExternalAuthProvider?.type,
              access_token: accountExternalAuthProvider?.access_token,
              expires_at: accountExternalAuthProvider?.expires_at,
              id: randomUUID(),
              id_token: accountExternalAuthProvider?.id_token,
              refresh_token: accountExternalAuthProvider?.refresh_token,
              scope: accountExternalAuthProvider?.scope,
              session_state: accountExternalAuthProvider?.session_state,
              token_type: accountExternalAuthProvider?.token_type,
            },
          },
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

      if (!createUser) {
        throw new Error("User not found");
      }
      return Promise.resolve(true);
    }
  }
}
