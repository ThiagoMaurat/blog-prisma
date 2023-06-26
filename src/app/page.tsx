import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Limiter } from "@/components/Limiter";
import FirstSection from "./(site)/FirstSection";
import SecondSection from "./(site)/SecondSection";
export default async function Page() {
  return (
    <Limiter>
      <Header />
      <FirstSection />

      <SecondSection />
      <Footer />
    </Limiter>
  );
}
