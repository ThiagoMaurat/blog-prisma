"use client";
import { Session } from "next-auth";
import React from "react";
import Avatar from "../Avatar";
import { Popover } from "../DropDownMenu";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { DefaultButton } from "../DefaultButton";

interface PopoverProps {
  user: Session["user"] | null;
}

export default function PopoverNavBar(props: PopoverProps) {
  const { user } = props;
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
    </>
  );
}
