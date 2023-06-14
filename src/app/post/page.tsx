import { Limiter } from "@/components/Limiter";
import { Header } from "@/components/Header";
import Posts from "./[id]/page";
export default function Page() {
  return (
    <Limiter>
      <Header />
      <Posts />
    </Limiter>
  );
}
