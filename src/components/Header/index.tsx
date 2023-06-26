import React from "react";
import { NavBar } from "../NavBar";

export const Header = () => {
  // @ts-expect-error Server Component
  return <NavBar />;
};
