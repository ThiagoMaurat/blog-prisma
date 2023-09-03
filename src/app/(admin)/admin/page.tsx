import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Admin() {
  const data = await getServerSession(authOptions);

  if (!data || data.user.userRole?.[0].role.name !== "admin") {
    redirect("/");
  }

  return <div>Admin</div>;
}
