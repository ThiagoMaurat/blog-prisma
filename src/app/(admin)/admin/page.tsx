import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import CreateThemeDialog from "@/components/CreateThemeDialog";
import { PostForm } from "@/components/Forms/create-post-form";
import { getListThemesAction } from "@/actions/themes/list-themes/list-theme";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Admin Page",
  description: "Private Page for admins",
};

export default async function Admin() {
  const data = await getServerSession(authOptions);

  if (!data || data.user.role !== "admin") {
    redirect("/");
  }

  const themes = await getListThemesAction({});

  return (
    <main className="max-w-[1000px] w-full mx-auto">
      <h1 className="text-3xl font-medium">Admin Page</h1>

      <section className="flex flex-col gap-2 my-2 border-2 border-gray-400 p-4 rounded-md ">
        <h2>Temas</h2>
        <CreateThemeDialog />
        <ol style={{ listStyle: "inside" }}>
          {themes?.data?.theme?.map((theme) => (
            <li key={theme?.id}>{theme?.name}</li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-2 my-2 border-2 border-gray-400 p-4 rounded-md ">
        <h2>Posts</h2>
        <PostForm
          themes={themes.data?.theme}
          authorId={data.user.id}
          role={data.user.role}
        />
      </section>
    </main>
  );
}
