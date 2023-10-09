"use server";
import { schema } from "./schema";
import { cookies } from "next/headers";

export const mutateForm = async (formData: FormData) => {
  const formDataName = formData.get("name")?.toString();

  if (!formDataName) return;

  const { name } = await schema.parseAsync({ name: formDataName });

  const mutate = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/themes`, {
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
  });

  /*   revalidateTag("theme"); */

  if (!mutate.ok) return { ok: false };

  return { ok: true };
};
