import { headers } from "next/headers";

export async function makeFetch<T = unknown>(
  url: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<T> {
  const host = headers().get("host");
  const data = await fetch(`${host}${url}`, init);

  const result = await data.json();

  return result;
}
