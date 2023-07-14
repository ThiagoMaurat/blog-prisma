import { z } from "zod";

const envSchema = z.object({
  NEXTAUTH_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  NEXT_JSON_WEB_TOKEN: z.string(),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === "production"
      ? z.string().min(1)
      : z.string().min(1).optional(),
});

const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid enviroment variables", _env.error.format());

  throw new Error("Invalid enviroment variables");
}

export const { data: env } = _env;
