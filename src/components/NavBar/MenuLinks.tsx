import Link from "next/link";
import { useRouter } from "next/compat/router";
import { useCallback } from "react";
import ToggleButtonDarkMode from "../ToogleButtonDarkMode";
import { signOut, useSession } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import CreatePostModal from "./CreatePostModal";

type MenuLinksProps = {
  isOpen: boolean;
  isLoading?: boolean;
};

export const MenuLinks = ({ isOpen, isLoading }: MenuLinksProps) => {
  const router = useRouter();
  const { data } = useSession();

  const CheckRouterMatchesLabel = useCallback(
    (label: string) => {
      if (router?.asPath.includes(label.toLowerCase())) {
        return true;
      } else if (router?.asPath === "/" && label === "Home") {
        return true;
      }
      return false;
    },
    [router?.asPath]
  );

  return (
    <div
      className={` ${
        isOpen ? "block" : "hidden"
      } sm:block w-[55%] basis-full sm:basis-auto`}
    >
      <div className="flex sm:items-baseline gap-6 justify-between flex-col sm:flex-row pt-8 sm:pt-0">
        <div className="h-full flex gap-8 items-center flex-col sm:flex-row">
          <Link href={"/"}>
            <p
              className={`${
                CheckRouterMatchesLabel("Home")
                  ? "bottom-1 font-bold border-b-2 text-gray-300"
                  : "hover:bottom-1 hover:font-bold hover:border-b-2 hover:text-gray-300 hover:transition-all"
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
                  : "hover:bottom-1 hover:font-bold hover:border-b-2 hover:text-gray-300 hover:transition-all"
              }`}
            >
              Blog
            </p>
          </Link>

          {data?.user.userRole[0].role.name === "admin" && <CreatePostModal />}
        </div>

        <div className="flex h-full flex-row gap-2 justify-center">
          <ToggleButtonDarkMode />
          {data?.user?.name && (
            <MdLogout
              size={24}
              onClick={() => signOut({ callbackUrl: "/login" })}
              cursor={"pointer"}
            />
          )}
        </div>
      </div>
    </div>
  );
};
