"use client";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { getSession, signOut } from "next-auth/react";

export default function Hello() {
  const teste = async () => {
    const session = await getSession();
    console.log(session);
    return session;
  };
  return (
    <>
      {/* <button onClick={() => signOut()}>Sair</button> */}
      <pre>{JSON.stringify(teste(), null, 2)}</pre>
    </>
  );
}
