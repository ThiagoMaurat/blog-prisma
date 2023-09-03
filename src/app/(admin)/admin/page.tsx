import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { getThemes } from "@/queries/get-themes";
import CreateThemeDialog from "@/components/CreateThemeDialog";

export default async function Admin() {
  const data = await getServerSession(authOptions);

  if (!data || data.user.userRole?.[0].role.name !== "admin") {
    redirect("/");
  }

  const themes = await getThemes();

  return (
    <>
      <h1 className="text-3xl font-medium">Admin Page</h1>

      <section className="flex flex-col gap-2 my-2 border-2 border-gray-400 p-4 rounded-md">
        <h2>Temas</h2>
        <CreateThemeDialog />
      </section>

      <section className="my-2">
        <div>{JSON.stringify(themes)}</div>
      </section>
    </>
  );
}
