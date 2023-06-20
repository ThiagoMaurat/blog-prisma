import { getServerSession } from "next-auth";
import { NavBarContainer } from "./NavBarContainer";
import Navigation from "./Navigation";
import { authOptions } from "@/server/auth";
export async function NavBar() {
  const data = await getServerSession(authOptions);

  return (
    <NavBarContainer>
      <Navigation user={data?.user ?? null} />
    </NavBarContainer>
  );
}
