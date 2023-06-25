"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MenuToggle } from "./MenuToggle";
import { MenuLinks } from "./MenuLinks";
import { Session } from "next-auth";
import PopoverNavBar from "./Popover";

type NavigationProps = {
  user: Session["user"] | null;
};

export default function Navigation({ user }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickLogo = () => {
    router?.push("/");
  };

  const toggle = () => setIsOpen(!isOpen);
  const router = useRouter();

  return (
    <>
      <h2
        className="font-bold text-3xl self-center cursor-pointer gray-900"
        onClick={handleClickLogo}
      >
        Thiago🚀Dev
      </h2>

      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} user={user} />
    </>
  );
}
