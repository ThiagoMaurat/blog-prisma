import { cn } from "@/lib/utils";
import React from "react";
import { ProjectSlide } from "./ProjectSlide";
import { ThiagoDevProject } from "@/config/projects";
import { ButtonTheme } from "./ButtonTheme";
import { TbBrandNextjs } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import ShadCnUi from "../../public/Icons/ShadCnUi";
import NextAuth from "../../public/Icons/NextAuth";
import PrismaIcon from "../../public/Icons/Prisma";

interface FourthSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function FourthSection(props: FourthSectionProps) {
  const { className } = props;

  return (
    <section
      className={cn("flex flex-col md:flex-row gap-8", className)}
      {...props}
    >
      <article className="flex gap-4 flex-col md:max-w-[50%] w-full">
        <ProjectSlide projects={ThiagoDevProject} />

        <div className="w-full flex h-auto flex-wrap gap-2 h-9 whitespace-nowrap">
          <ButtonTheme leftIcon={<TbBrandNextjs />}>NextJs</ButtonTheme>
          <ButtonTheme leftIcon={<ShadCnUi />}>Shadcn/ui</ButtonTheme>
          <ButtonTheme leftIcon={<NextAuth />}>Next-Auth</ButtonTheme>
          <ButtonTheme leftIcon={<FaReact />}>React</ButtonTheme>
          <ButtonTheme leftIcon={<PrismaIcon />}>Prisma</ButtonTheme>
        </div>
      </article>

      <aside className="hidden md:block md:max-w-[50%] w-full text-center text-4xl font-semibold">
        <h3 className="text-4xl font-semibold sticky top-1/2 mt-3 transform -translate-y-1/2">
          Projetos 📽️
        </h3>
      </aside>
    </section>
  );
}
