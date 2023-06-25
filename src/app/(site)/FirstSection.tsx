import React from "react";
import { Lottie } from "./Lootie";
import { DefaultButton } from "@/components/DefaultButton";

export default function FirstPage() {
  return (
    <div className="flex items-center min-h-[572px] flex-col md:flex-row gap-6">
      <div className="max-w-full md:max-w-[50%] w-full gap-4 flex flex-col md:justify-normal text-center md:text-start">
        <h2 className="text-5xl font-bold">Olá!</h2>
        <h1 className="text-5xl ">Sou Thiago Maurat</h1>
        <span className="text-2xl">Desenvolvedor Front-end</span>

        <div className="flex gap-4 justify-center md:justify-normal">
          <DefaultButton label={"Posts"} />

          <DefaultButton label={"Saiba mais"} />
        </div>
      </div>

      <div className="max-w-full md:max-w-[50%] w-full justify-center items-center">
        <Lottie />
      </div>
    </div>
  );
}
