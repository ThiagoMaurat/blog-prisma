import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

export default async function Hello() {
  const session = await getServerSession(authOptions);
  return (
    <>
      {/* <button onClick={() => signOut()}>Sair</button> */}
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
