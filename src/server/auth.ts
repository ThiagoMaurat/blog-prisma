import { type GetServerSidePropsContext } from "next";
import {
  DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { env } from "@/env";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { UserRole } from "@prisma/client";
import { randomUUID } from "crypto";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
  interface User {
    role: UserRole;
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

        try {
          const { data } = await axios.post(
            "http://localhost:3000/api/auth/login",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          if (data) {
            return data.user;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // only for external providers like github
    // it wont affect the credentials providers
    async signIn({ profile, user, account }) {
      console.log(account, user, profile);
      if (profile && account) {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (existingUser) {
          return Promise.resolve(true);
        } else {
          await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              image: user.image,
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
              Account: {
                create: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  type: account.type,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  id: randomUUID(),
                  id_token: account.id_token,
                  refresh_token: account.refresh_token,
                  scope: account.scope,
                  session_state: account.session_state,
                  token_type: account.token_type,
                },
              },
            },
          });
        }
      }

      return Promise.resolve(true);
    },
    session: async ({ session, user, token }) => {
      session.user.id = token.id;
      return session;
    },
    jwt: ({ token, user, account }) => {
      if (account) {
        token.acessToken = account.access_token;
        token.id = user.id;
      }

      if (user) {
        return {
          ...token,
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
