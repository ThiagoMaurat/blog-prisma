import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/server/repositories/user-repository";
import { randomUUID } from "crypto";
import { AuthenticateUserCaseOutput } from "./Authenticate";
interface AuthenticateExternalProviderUseCaseInput {
  email: string;
  accountExternalAuthProvider?: any;
  userExternalAuthProvider?: any;
}

export type User = {} & AuthenticateUserCaseOutput["user"];

export class AuthenticateExternalProvider {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    accountExternalAuthProvider,
    userExternalAuthProvider,
  }: AuthenticateExternalProviderUseCaseInput): Promise<User | null> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      return {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        emailVerified: existingUser.emailVerified,
        image: existingUser.image,
        created_at: existingUser.created_at,
        role: existingUser.UserRole[0].role.name,
      };
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

      return {
        id: createUser.id,
        name: createUser.name,
        email: createUser.email,
        emailVerified: createUser.emailVerified,
        image: createUser.image,
        created_at: createUser.created_at,
        role: createUser.UserRole[0].role.name,
      };
    }

    throw new Error("User not found");
  }
}
