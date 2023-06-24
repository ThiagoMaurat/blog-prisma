import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Limiter } from "@/components/Limiter";
import FirstSection from "./(site)/FirstSection";
export default async function Page() {
  return (
    <Limiter>
      <Header />
      <FirstSection />
      <Footer />
    </Limiter>
  );
}
