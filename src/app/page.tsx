import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";

export default async function Hello() {
  const session = await getServerSession(authOptions);
  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
