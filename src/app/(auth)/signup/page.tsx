import { type Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/CardNav/card";
import { SignUpForm } from "@/components/Forms/singup/signup-form";
import { env } from "../../../../env.mjs";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? ""),
  title: "Sign Up",
  description: "Sign up for an account",
};

export default function SignUpPage() {
  return (
    <Card className="max-w-[420px] w-full mx-auto md:mx-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Cadastro</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <SignUpForm />
      </CardContent>

      <CardFooter className="grid gap-4">
        <div className="text-sm text-muted-foreground">
          Já possui uma conta?{" "}
          <Link
            aria-label="Sign in"
            href="/signin"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Entre aqui
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
