import Avatar from "../Avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LogOut, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../DropDownMenu";
import { Switch } from "../Switch";
import { useTheme } from "next-themes";
import { Button } from "../Button";

export default function PopoverNavBar() {
  const { setTheme, resolvedTheme } = useTheme();

  const { data } = useSession();

  if (data?.user) {
    return (
      <>
        {data?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="self-center">
              <Avatar user={data?.user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2" align="end">
              <div className="w-full h-full flex flex-col gap-4">
                <p className=" font-medium truncate">{data?.user?.name}</p>
                <p className=" truncate">{data?.user?.email}</p>

                <div className="border-b" />

                <div className="flex justify-center gap-3">
                  <Switch
                    className="self-center"
                    checked={resolvedTheme === "dark"}
                    onClick={() =>
                      resolvedTheme === "dark"
                        ? setTheme("light")
                        : setTheme("dark")
                    }
                  />
                  {resolvedTheme === "dark" ? (
                    <Moon size={24} />
                  ) : (
                    <Sun size={24} />
                  )}
                </div>

                <div
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex justify-center gap-2 cursor-pointer"
                >
                  <span>Log out</span>
                  <LogOut size={24} cursor={"pointer"} />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </>
    );
  }

  return (
    <>
      {!data?.user && (
        <Link href={"/signin"} prefetch={false} className="self-center">
          <Button label={"Entrar"} variant="primary" className="text-md" />
        </Link>
      )}
    </>
  );
}
