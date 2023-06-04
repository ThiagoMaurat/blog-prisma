import { Limiter } from "@/components/Limiter";
import { Header } from "@/components/Header";
import { FormComponent } from "./components/FormComponent";
export default function Page() {
  return (
    <Limiter>
      <Header />
      <FormComponent />
    </Limiter>
  );
}
