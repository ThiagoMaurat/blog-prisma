import React from "react";
import Image from "next/image";
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

      <div
        className="h-full p-4 sm:p-0 flex gap-4 flex-col md:flex-row  justify-evenly items-center"
        style={{ minHeight: "calc(100vh - 112px)" }}
      >
        <div className="md:flex md:justify-between md:max-w-[1000px] w-full mx-auto">
          <Image
            src={"/login.png"}
            width={300}
            height={500}
            style={{ borderRadius: "1rem" }}
            alt="login-image"
            className="hidden md:flex"
          />
          {children}
        </div>
      </div>
    </Limiter>
  );
}
