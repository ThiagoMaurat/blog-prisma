"use server";
import { revalidateTag } from "next/cache";
import { schema } from "./schema";
import { cookies } from "next/headers";
import { env } from "../../../../env.mjs";

export const mutateForm = async (formData: FormData) => {
  const formDataName = formData.get("name")?.toString();

  if (!formDataName) return;

  const { name } = await schema.parseAsync({ name: formDataName });

  const mutate = await fetch(
    `https://blog-prisma-gray.vercel.app/api/admin/themes`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          cookies().get("next-auth.session-token")?.value
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    }
  );

  revalidateTag("theme");

  if (!mutate.ok) return { ok: false };

  return { ok: true };
};
