import React from "react";
import { Limiter } from "@/components/Limiter";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function layout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <Limiter>
      <main>{children}</main>
    </Limiter>
  );
}
