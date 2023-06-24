import React from "react";
import Lootie from "./Lootie";
import { DefaultButton } from "@/components/DefaultButton";

export default function FirstPage() {
  return (
    <div
      style={{ height: "calc(100vh - 112px)" }}
      className="flex items-center  flex-col md:flex-row"
    >
      <div className="max-w-full md:max-w-[50%] w-full gap-4 flex flex-col md:justify-normal text-center md:text-start">
        <h2 className="text-5xl font-bold">Olá!</h2>
        <h1 className="text-5xl ">Sou Thiago Maurat</h1>
        <span className="text-2xl">Desenvolvedor Front-end</span>

        <div className="flex gap-4 justify-center md:justify-normal">
          <DefaultButton label={"Posts"} />

          <DefaultButton label={"Saiba mais"} />
        </div>
      </div>

      <div className="max-w-full md:max-w-[50%] w-full">
        <Lootie />
      </div>
    </div>
  );
}
