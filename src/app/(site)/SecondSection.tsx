import { cn } from "@/lib/utils";
import React from "react";

interface SecondSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SecondSection(props: SecondSectionProps) {
  const secondSectionData = [
    {
      title: "😎 Quem sou eu?",
      content:
        "Olá mundo! Sou apaixonado pelo que a tecnologia proporciona! Estou atualmente em busca do desenvolvimento pessoal e profissional, tentando adquirir o maior conhecimento possível em novas tecnologias. Estou trabalhando em uma software house em São Paulo e estou disposto a trocar conhecimentos e contar um pouco sobre minha experiência. Sinta-se a vontade para entrar em contato!",
    },
    {
      title: "💡 O que possuo como experiência?",
      content:
        "Busco sempre a diversidade de tecnologias, visto a possibilidade de sempre entrarmos em projetos legados e novos. Possuo como experiência projetos em CRA, Vite e NextJs (favorito da humanidade). Tenho, também, conhecimento em ChakraUI, StyledComponents, MaterialUI, Tailwind e Shadcn (primitivos do RadixUI e CLI incrível). Por fim, como gerenciador de conteúdo já utilizei Firebase e Supabase(incrível integração com server components).",
    },
    {
      title: "👌 O que pretendo aprender",
      content:
        "Dentre as infinitas tecnologias disponíveis, basta sabermos tudo (👀). Temos de ser seletivos em que iremos aprender pois diferentemente das possibilidades nosso tempo é limitado. Com isso, tenho como meta o desenvolvimento full-stack e atualmente busco aprender, também, SQL e NodeJs. Estou em busca de conhecimento em banco de dados relacional e frameworks amplamente utilizados no mercado como NestJS e outros como prioridade secundária. Como ORM, utilizo Prisma (assim como nesse projeto) e estou de olho no DrizzleORM (além dos já consolidados no mercado como Knex e TypeORM e Sequelize). Cabe ressaltar o incrível ecossistema do NextJs que, através da facilidade do serveless, permite a criação de aplicações escaláveis e efetuar o pagamento somente pelo custo efetivo.",
    },
  ];

  const { className } = props;

  return (
    <section
      className={cn("flex flex-col md:flex-row gap-8", className)}
      {...props}
    >
      <h3 className="block md:hidden text-4xl font-semibold">
        Hello World! 🪐
      </h3>

      <article className="flex gap-7 flex-col md:max-w-[50%] w-full">
        {secondSectionData.map(({ title, content }, index) => (
          <div key={index}>
            <h3 className="text-2xl mb-2">{title}</h3>
            <p className="tracking-wide text-justify">{content}</p>
          </div>
        ))}
      </article>

      <aside className="hidden md:block md:max-w-[50%] w-full text-center text-4xl font-semibold">
        <h3 className="text-4xl font-semibold sticky top-1/2 mt-3 transform -translate-y-1/2">
          Hello World! 🪐
        </h3>
      </aside>
    </section>
  );
}
