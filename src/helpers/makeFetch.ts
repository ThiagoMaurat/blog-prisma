export async function makeFetch<T = unknown>(
  url: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<T> {
  const data = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}${url}`, init);

  const result = await data.json();

  return result;
}
