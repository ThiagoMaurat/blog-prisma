import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion/Accordion";
import { cn } from "@/lib/utils";
import React from "react";
import HTML from "../../public/Icons/HTML";
import CSS from "../../public/Icons/CSS";
import JavaScript from "../../public/Icons/JavaScript";
import ReactLogo from "../../public/Icons/React";
import TypeScript from "../../public/Icons/TypeScript";
import NodeJs from "../../public/Icons/Node";
import {
  CSSContent,
  HTMLContent,
  JavaScriptContent,
  NodeJsContent,
  ReactContent,
  TypeScriptContent,
} from "./AccordionText";

interface SecondSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ThirdSection(props: SecondSectionProps) {
  const { className } = props;

  const accordionData = [
    {
      Icon: <HTML />,
      title: "HTML",
      content: <HTMLContent />,
    },
    {
      Icon: <CSS />,
      title: "CSS",
      content: <CSSContent />,
    },
    {
      Icon: <JavaScript />,
      title: "JavaScript",
      content: <JavaScriptContent />,
    },
    {
      Icon: <TypeScript />,
      title: "TypeScript",
      content: <TypeScriptContent />,
    },
    {
      Icon: <ReactLogo />,
      title: "React",
      content: <ReactContent />,
    },
    {
      Icon: <NodeJs />,
      title: "NodeJs",
      content: <NodeJsContent />,
    },
  ];

  return (
    <section
      className={cn("flex flex-col md:flex-row my-14", className)}
      {...props}
    >
      <aside className="md:max-w-[50%] w-full text-center">
        <h3 className="text-4xl font-semibold sticky mt-3 top-1/2 transform -translate-y-1/2">
          Minhas habilidades 😁
        </h3>
      </aside>

      <article className=" md:max-w-[50%] w-full">
        <Accordion type="single" collapsible className="w-full">
          {accordionData.map(({ Icon, title, content }, index) => (
            <AccordionItem
              key={`item-${index}`}
              value={`item-accordion-${index}`}
            >
              <AccordionTrigger>
                <div className="flex gap-4 items-center">
                  <div>{Icon}</div>
                  <h2>{title}</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>{content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </article>
    </section>
  );
}
