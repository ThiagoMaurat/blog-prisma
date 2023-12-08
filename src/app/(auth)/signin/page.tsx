import { type Metadata } from "next";
import { FormComponent } from "../../../components/Forms/singin/FormComponent";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? ""),
  title: "Login Page",
  description: "Welcome! Please login to continue",
};

export default function Page() {
  return <FormComponent />;
}
