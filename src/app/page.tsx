"use client";
import { Footer } from "@/components/Footer";
import { Limiter } from "@/components/Limiter";
import { useSession } from "next-auth/react";
export default function Hello() {
  const { data } = useSession();
  return (
    <Limiter>
      {/* <button onClick={() => signOut()}>Sair</button> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Footer className="py-16" />
    </Limiter>
  );
}
