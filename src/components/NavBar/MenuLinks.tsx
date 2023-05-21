import Link from "next/link";
import { useRouter } from "next/compat/router";
import { useCallback } from "react";
import ToggleButtonDarkMode from "../ToogleButtonDarkMode";
import { signOut, useSession } from "next-auth/react";
import { MdLogout } from "react-icons/md";

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
      className={`block md:${
        isOpen ? "block" : "hidden"
      } w-[55%] md:basis-full basis-auto`}
    >
      <div className="flex gap-6 justify-between sm:justify-center md:flex-col flex-row md:pt-8">
        <div className="flex gap-8 items-center md:flex-col">
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
        </div>

        <div className="flex flex-row gap-2 justify-center">
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
