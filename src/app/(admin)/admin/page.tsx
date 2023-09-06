import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { getThemes } from "@/queries/get-themes";
import CreateThemeDialog from "@/components/CreateThemeDialog";
import dynamic from "next/dynamic";

export default async function Admin() {
  const data = await getServerSession(authOptions);

  if (!data || data.user.userRole?.[0].role.name !== "admin") {
    redirect("/");
  }

  const themes = await getThemes();

  const Editor = dynamic(() => import("../../../components/Editor/index"), {
    ssr: false,
  });

  return (
    <>
      <h1 className="text-3xl font-medium">Admin Page</h1>

      <section className="flex flex-col gap-2 my-2 border-2 border-gray-400 p-4 rounded-md">
        <h2>Temas</h2>
        <CreateThemeDialog />
        <ol style={{ listStyle: "inside" }}>
          {themes.themes.map((theme) => (
            <li key={theme.id}>{theme.name}</li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-2 my-2 border-2 border-gray-400 p-4 rounded-md">
        <h2>Posts</h2>
        <Editor />
      </section>
    </>
  );
}