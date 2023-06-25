"use client";
import { Session } from "next-auth";
import React from "react";
import Avatar from "../Avatar";
import { Popover } from "../DropDownMenu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { DefaultButton } from "../DefaultButton";
import { LogOut } from "lucide-react";

interface PopoverProps {
  user: Session["user"] | null;
}

export default function PopoverNavBar(props: PopoverProps) {
  const { user } = props;

  if (user) {
    return (
      <>
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
                <LogOut size={24} cursor={"pointer"} />
              </div>
            </div>
          </Popover>
        )}
      </>
    );
  }

  return (
    <>
      {!user && (
        <Link href={"/login"} className="self-center">
          <DefaultButton label={"Entrar"} className="text-md" />
        </Link>
      )}
    </>
  );
}
