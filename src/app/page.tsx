import FirstSection from "@/components/FirstSection";
import { Footer } from "@/components/Footer";
import FourthSection from "@/components/FourthSection";
import { Header } from "@/components/Header";
import { Limiter } from "@/components/Limiter";
import SecondSection from "@/components/SecondSection";
import ThirdSection from "@/components/ThirdSection";
import { Metadata } from "next/types";

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
