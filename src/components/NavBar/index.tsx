"use client";
import { useState } from "react";
import { MenuLinks } from "./MenuLinks";
import { MenuToggle } from "./MenuToggle";
import { NavBarContainer } from "./NavBarContainer";
import { useRouter } from "next/compat/router";

type NavBarProps = {
  isLoading: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const NavBar = ({ isLoading, ...props }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const router = useRouter();

  const handleClickLogo = () => {
    router?.push("/");
  };

  return (
    <NavBarContainer {...props}>
      <h2
        className="font-bold text-3xl cursor-pointer gray-900"
        onClick={handleClickLogo}
      >
        Thiago🚀Dev
      </h2>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};
