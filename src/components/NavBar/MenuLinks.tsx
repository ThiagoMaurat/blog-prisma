import Link from "next/link";
import { useRouter } from "next/compat/router";
import PopoverNavBar from "./Popover";
import { Session } from "next-auth";

type MenuLinksProps = {
  isOpen: boolean;
  user: Session["user"] | null;
};

export function MenuLinks({ isOpen, user }: MenuLinksProps) {
  const router = useRouter();

  const CheckRouterMatchesLabel = (label: string) => {
    if (router?.asPath.includes(label.toLowerCase())) {
      return true;
    } else if (router?.asPath === "/" && label === "Home") {
      return true;
    }
    return false;
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } md:block w-[55%] basis-full md:basis-auto`}
    >
      <div className="flex h-full md:items-center gap-6 justify-between flex-col md:flex-row pt-8 md:pt-0">
        <div className="h-full flex gap-8 items-center flex-col md:flex-row">
          <Link href={"/"}>
            <p
              className={`${
                CheckRouterMatchesLabel("Home")
                  ? "bottom-1 font-bold border-b-2 text-gray-300"
                  : "hover:bottom-1 hover:font-bold hover:border-b-2 hover:text-gray-300 hover:transition-all font-medium"
              }`}
            >
              Home
            </p>
          </Link>

          <Link href={"/blog"}>
            <p
              className={`${
                CheckRouterMatchesLabel("Home")
                  ? "bottom-1 font-bold border-b-2 text-gray-300"
                  : "hover:bottom-1 hover:font-bold hover:border-b-2 hover:text-gray-300 hover:transition-all font-medium"
              }`}
            >
              Blog
            </p>
          </Link>

          <Link href="#footer">
            <p
              className={`${
                CheckRouterMatchesLabel("Home")
                  ? "bottom-1 font-bold border-b-2 text-gray-300"
                  : "hover:bottom-1 hover:font-bold hover:border-b-2 hover:text-gray-300 hover:transition-all font-medium"
              }`}
            >
              Contato
            </p>
          </Link>

          {user?.userRole?.[0]?.role?.name === "admin" && (
            <Link href="/admin">
              <p
                className={`${
                  CheckRouterMatchesLabel("Home")
                    ? "bottom-1 font-bold border-b-2 text-gray-300"
                    : "hover:bottom-1 hover:font-bold hover:border-b-2 hover:text-gray-300 hover:transition-all font-medium"
                }`}
              >
                Admin
              </p>
            </Link>
          )}
        </div>
        <PopoverNavBar />
      </div>
    </div>
  );
}
