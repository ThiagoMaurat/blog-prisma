import { cn } from "@/lib/utils";
import React from "react";
import { ProjectSlide } from "./ProjectSlide";
import { thiagoDevProject } from "@/config/projects";

interface FourthSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function FourthSection(props: FourthSectionProps) {
  const { className } = props;

  return (
    <section
      className={cn("flex flex-col md:flex-row gap-8", className)}
      {...props}
    >
      <article className="flex gap-7 flex-col md:max-w-[50%] w-full">
        <ProjectSlide projects={thiagoDevProject} />
      </article>

      <aside className="hidden md:block md:max-w-[50%] w-full text-center text-4xl font-semibold">
        <h3 className="text-4xl font-semibold sticky top-1/2 mt-3 transform -translate-y-1/2">
          Projetos 📽️
        </h3>
      </aside>
    </section>
  );
}
