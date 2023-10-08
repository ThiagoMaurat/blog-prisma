import { type GetServerSidePropsContext } from "next";
import {
  DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { Role, UserRole } from "@prisma/client";
import { PrismaUsersRepository } from "./repositories/prisma/users-repository";
import { AuthenticateExternalProvider } from "./use-cases/Authenticate/AuthenticateExternalProvider";
import { env } from "@/../env.mjs";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

interface IUser {
  id: string;
  email: string | null;
  created_at: Date | null;
  image: string | null;
  name: string | null;
  userRole: (UserRole & {
    role: Role;
  })[];
}

declare module "next-auth" {
  interface User extends DefaultSession {
    id: string;
    email: string;
    created_at: string;
    image: string;
    name: string;
    role: UserRole;
  }
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

        const { data } = await axios.post(
          `${env.NEXTAUTH_URL}/api/auth/login`,
          {
            email: credentials.email,
            password: credentials.password,
          }
        );

        if (data) {
          return data.user;
        }

        throw new Error("Invalid credentials");
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
      const makeExternalProviderAuth = new AuthenticateExternalProvider();

      if (profile?.email && account) {
        return makeExternalProviderAuth.execute({
          email: profile.email,
          accountExternalAuthProvider: account,
          userExternalAuthProvider: user,
        });
      }

      return Promise.resolve(true);
    },
    async session({ session, token }) {
      session.user = token.user;
      return { ...session };
    },
    jwt: async ({ token, session }) => {
      const prisma = new PrismaUsersRepository();

      if (token.email) {
        const userInfo = await prisma.findByEmail(token.email);

        if (!userInfo) {
          return session;
        }

        const userDB = {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          image: userInfo.image,
          created_at: userInfo.created_at,
          userRole: userInfo.UserRole,
        };

        if (userDB) {
          return {
            user: userDB,
            token: {
              sub: token.sub,
              iat: token.iat,
              exp: token.exp,
              jti: token.jti,
            },
          };
        }
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
