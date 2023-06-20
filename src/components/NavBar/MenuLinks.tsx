import Link from "next/link";
import { useRouter } from "next/compat/router";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import CreatePostModal from "./CreatePostModal";
import { Popover } from "../DropDownMenu";
import Avatar from "../Avatar";
import { Session } from "next-auth";
import { DefaultButton } from "../DefaultButton";

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
      } sm:block w-[55%] basis-full sm:basis-auto`}
    >
      <div className="flex h-full sm:items-center gap-6 justify-between flex-col sm:flex-row pt-8 sm:pt-0">
        <div className="h-full flex gap-8 items-center flex-col sm:flex-row">
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

          {user?.userRole?.[0]?.role?.name === "admin" && <CreatePostModal />}
        </div>

        {user && (
          <Popover openButtonChildren={<Avatar user={user} />}>
            <div className="w-full h-full flex flex-col gap-2">
              <p className=" font-medium truncate">{user?.name}</p>
              <p className=" truncate">{user?.email}</p>

              <div className="border-b" />

              <div
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex justify-center gap-2 cursor-pointer"
              >
                <span>Log out</span>
                <MdLogout size={24} cursor={"pointer"} />
              </div>
            </div>
          </Popover>
        )}

        {!user && (
          <Link href={"/login"}>
            <DefaultButton label={"Entrar"} className="text-md" />
          </Link>
        )}
      </div>
    </div>
  );
}
