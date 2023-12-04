import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaUsersRepository } from "./repositories/prisma/users-repository";
import { env } from "@/../env.mjs";
import { signInAction } from "@/actions/auth/sign-in/sign-in";
import { makeExternalAuthUseCase } from "./factories/make-external-auth-use-case";
import { AuthenticateUserCaseOutput } from "./use-cases/Authenticate/Authenticate";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

export type IUser = {
  externalProvider?: boolean;
} & AuthenticateUserCaseOutput["user"];

declare module "next-auth" {
  interface User extends IUser {}
  interface JWT {
    user: IUser;
    token: {
      sub: string;
      iat: number;
      exp: number;
      jti: string;
    };
  }
  interface Session {
    user: IUser;
    expires: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: IUser;
    token: {
      sub: string;
      iat: number;
      exp: number;
      jti: string;
    };
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await signInAction({
          email: credentials.email,
          password: credentials.password,
        });

        if (!user.data?.user.emailVerified) {
          throw new Error(`Email não verificado ${user.data?.user?.email}`);
        }

        if (user.data?.user) {
          return {
            ...user.data?.user,
            externalProvider: false,
          };
        }

        throw new Error(user.error || "Invalid credentials");
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // only for external providers like github
    // it wont affect the credentials providers
    async signIn({ profile, user, account }) {
      if (account?.provider === "github") {
        if (profile?.email && account) {
          const makeExternalProviderAuth = makeExternalAuthUseCase();
          const userExternalProvider = await makeExternalProviderAuth.execute({
            email: profile.email,
            accountExternalAuthProvider: account,
            userExternalAuthProvider: user,
          });

          return Promise.resolve(true);
        }
      }

      return Promise.resolve(true);
    },

    async session({ session, token }) {
      // only for external providers like github
      if (token.user.externalProvider !== false && token.user.email) {
        const prismaUsersRepository = new PrismaUsersRepository();
        const sessionUser = await prismaUsersRepository.findByEmail(
          token.user.email
        );

        if (!sessionUser) {
          session.user = token.user;
          return { ...session };
        }

        const user: IUser = {
          id: sessionUser.id,
          name: sessionUser.name,
          email: sessionUser.email,
          emailVerified: sessionUser.emailVerified,
          image: sessionUser.image,
          created_at: sessionUser.created_at,
          role: sessionUser.UserRole[0].role.name,
        };

        session.user = user;
        return { ...session };
      }

      //authorize with credentials
      session.user = token.user;
      return { ...session };
    },

    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          user: {
            ...token.user,
            ...user,
          },
        };
      }

      return token;
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
