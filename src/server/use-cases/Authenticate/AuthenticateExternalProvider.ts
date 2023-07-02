import { prisma } from "@/lib/prisma";
import { AdapterUser } from "next-auth/adapters";
import { randomUUID } from "crypto";
import { Account, User } from "next-auth";

interface AuthenticateExternalProviderUseCaseRequest {
  email: string;
  userExternalAuthProvider?: AdapterUser | User;
  accountExternalAuthProvider?: Account | null;
}

export class AuthenticateExternalProvider {
  constructor() {}

  async execute({
    email,
    userExternalAuthProvider,
    accountExternalAuthProvider,
  }: AuthenticateExternalProviderUseCaseRequest) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return Promise.resolve(true);
    } else if (accountExternalAuthProvider) {
      await prisma.user.create({
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
      });
    }

    return Promise.resolve(true);
  }
}
