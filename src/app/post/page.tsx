import { Limiter } from "@/components/Limiter";
import { Header } from "@/components/Header";
import Posts from "./[id]";
export default function Page() {
  return (
    <Limiter>
      <Header />
      <Posts />
    </Limiter>
  );
}
