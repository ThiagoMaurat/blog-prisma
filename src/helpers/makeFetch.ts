import { env } from "@/../env.mjs";

export async function makeFetch<T = unknown>(
  url: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<T> {
  const data = await fetch(`${env.URL_SERVER_COMPONENT}${url}`, init);

  const result = await data.json();

  return result;
}
