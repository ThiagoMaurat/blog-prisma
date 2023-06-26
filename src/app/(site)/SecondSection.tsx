import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion/Accordion";
import { cn } from "@/lib/utils";
import React from "react";
import HTML from "../../../public/Icons/HTML";
import CSS from "../../../public/Icons/CSS";
import JavaScript from "../../../public/Icons/JavaScript";
import ReactLogo from "../../../public/Icons/React";
import TypeScript from "../../../public/Icons/TypeScript";
import NodeJs from "../../../public/Icons/Node";
import {
  CSSContent,
  HTMLContent,
  JavaScriptContent,
  NodeJsContent,
  ReactContent,
  TypeScriptContent,
} from "./AccordionText";

interface SecondSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SecondSection(props: SecondSectionProps) {
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
    <div className={cn("flex flex-col md:flex-row", className)} {...props}>
      <div className=" md:max-w-[50%] w-full">
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
      </div>

      <div className="md:max-w-[50%] w-full text-center">
        <h2 className="text-4xl font-semibold pt-3">Minhas habilidades</h2>
      </div>
    </div>
  );
}
