import React from "react";
import { NavIndices } from "./NavIndicces";
import clsx from "clsx";
import {
  ArrowRightCircle,
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  Mail,
  TwitterIcon,
} from "lucide-react";

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  const footerClassName = clsx(
    "w-full",
    "grid",
    "gap-12",
    "py-8",
    "md:grid-cols-2",
    "lg:grid-cols-4",
    className
  );

  // const { push } = useRouter();

  return (
    <footer id="footer" className={footerClassName}>
      <div className="flex flex-col gap-4">
        <h2
          className="font-bold text-2xl cursor-pointer"
          // onClick={() => push("/")}
        >
          Thiago🚀Dev
        </h2>

        <p className="font-medium text-lg break-words">
          Olá amigos desenvolvedores!! Fique à vontade para deixar seus
          comentários e sugestões sobre o conteúdo do nosso blog.
        </p>
      </div>

      <div className="flex flex-col md:items-center gap-4">
        <h2 className="font-bold text-2xl">Início</h2>

        <div className="flex gap-2 flex-col">
          <NavIndices isExternal={false} href="" text="Topic #1" />
          <NavIndices isExternal={false} href="" text="Topic #2" />
          <NavIndices isExternal={false} href="" text="Topic #3" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl">NewsLetter</h2>
        <p className="font-medium text-lg break-words">
          Inscreva-se em nossa newsletter! Fique por dentro das últimas
          novidades do mundo dev.
        </p>

        <div className="flex items-center">
          <input
            className="rounded-full focus:outline-none bg-white border border-gray-300 py-2 px-4 placeholder-gray-400"
            type="input"
            placeholder="E-mail"
            // value={newsletterInput}
            // onChange={(e) => setNewsletterInput(e.target.value)}
          />

          <div className="ml-1">
            <button
              className="p-1 bg-transparent"
              // onClick={() => console.log("asd")}
            >
              <ArrowRightCircle size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:items-center">
        <h2 className="font-bold text-2xl">Contato</h2>

        <div className="flex gap-2 flex-col items-start">
          <NavIndices
            href="https://github.com/ThiagoMaurat"
            LeftIcon={<GithubIcon />}
            text="GitHub"
            isExternal
          />

          <NavIndices
            href="https://www.linkedin.com/in/thiago-maurat-477a041b9/"
            LeftIcon={<LinkedinIcon />}
            text="Linkedin"
            isExternal
          />

          <NavIndices
            href="mailto:thiagomaurat@hotmail.com"
            LeftIcon={<Mail />}
            text="E-mail"
            isExternal
          />

          <NavIndices
            href="https://www.facebook.com/thiago.maurat"
            LeftIcon={<FacebookIcon />}
            text="Facebook"
            isExternal
          />

          <NavIndices
            href="https://twitter.com/Thiago_Maurat"
            LeftIcon={<TwitterIcon />}
            text="Twitter"
            isExternal
          />
        </div>
      </div>
    </footer>
  );
};
