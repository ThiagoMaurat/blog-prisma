import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Limiter } from "@/components/Limiter";
import FirstSection from "./(site)/FirstSection";
import SecondSection from "./(site)/SecondSection";
import ThirdSection from "./(site)/ThirdSection";
import { Metadata } from "next/types";
import FourthSection from "./(site)/FourthSection";

export const metadata: Metadata = {
  title: "Thiagoa Maurat - Portfólio / Blog",
  description:
    "Portfólio e blog de Thiago Maurat para desenvolvimento web full stack",
  keywords: [
    "Nextjs",
    "Front-End",
    "Portfólio",
    "Blog",
    "Back-end",
    "Desenvolvedor",
    "React",
    "JavaScript",
    "TypeScript",
  ],
  authors: [
    {
      name: "Thiago Maurat",
      url: "https://github.com/thiagomaurat",
    },
  ],
};
export default async function Page() {
  return (
    <Limiter>
      <Header />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </Limiter>
  );
}
