import { Session } from "next-auth";
import React, { useState } from "react";
import Avatar from "../Avatar";
import { signOut } from "next-auth/react";
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

interface PopoverProps {
  user: Session["user"] | null;
}

export default function PopoverNavBar(props: PopoverProps) {
  const { user } = props;

  const { setTheme, resolvedTheme } = useTheme();
  console.log(resolvedTheme);

  if (user) {
    return (
      <>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="self-center">
              <Avatar user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2" align="end">
              <div className="w-full h-full flex flex-col gap-4">
                <p className=" font-medium truncate">{user?.name}</p>
                <p className=" truncate">{user?.email}</p>

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
                  onClick={() => signOut({ callbackUrl: "/login" })}
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
      {!user && (
        <Link href={"/login"} className="self-center">
          <Button label={"Entrar"} variant="primary" className="text-md" />
        </Link>
      )}
    </>
  );
}
