import React from "react";
import { Lottie } from "./Lootie";
import Link from "next/link";
import { Button } from "@/components/Button";

export default function FirstPage() {
  return (
    <div className="flex items-center min-h-[572px] h-[calc(100vh-96px)] flex-col md:flex-row gap-6">
      <div className="max-w-full md:max-w-[50%] w-full gap-4 flex flex-col md:justify-normal text-center md:text-start">
        <h2 className="text-4xl font-bold">Olá!</h2>
        <h1 className="text-4xl ">Sou Thiago Maurat</h1>
        <span className="text-2xl">Desenvolvedor Front-end</span>

        <div className="flex gap-4 justify-center md:justify-normal">
          <Link href={"/blog"}>
            <Button label="Posts" variant={"primary"} />
          </Link>

          <Button label="Saiba mais" variant={"primary"} />
        </div>
      </div>

      <div className="max-w-full md:max-w-[50%] w-full">
        <Lottie />
      </div>
    </div>
  );
}
