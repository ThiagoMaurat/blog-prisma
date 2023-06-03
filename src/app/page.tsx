"use client";
import { useSession } from "next-auth/react";
export default function Hello() {
  const { data } = useSession();
  return (
    <>
      {/* <button onClick={() => signOut()}>Sair</button> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
