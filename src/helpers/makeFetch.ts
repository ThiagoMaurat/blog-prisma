import { env } from "@/../env.mjs";

export async function makeFetch<T = unknown>(
  url: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<T> {
  const data = await fetch(`https://blog-prisma-gray.vercel.app${url}`, init);

  const result = await data.json();

  return result;
}
