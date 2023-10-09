import React from "react";
import { Limiter } from "@/components/Limiter";
import { Header } from "@/components/Header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function layout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <Limiter>
      <Header />

      <main>{children}</main>
    </Limiter>
  );
}
