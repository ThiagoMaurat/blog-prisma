import { authOptions } from "@/server/auth";
import { Button } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default async function Hello() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
