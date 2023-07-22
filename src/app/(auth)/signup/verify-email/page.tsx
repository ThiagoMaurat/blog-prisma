import { type Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/CardNav/card";
import { VerifyEmailForm } from "@/components/forms/verify-email-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? ""),
  title: "Verify Email",
  description: "Verify your email address to continue with your sign up",
};

interface VerifyEmailPageProps {
  searchParams: {
    email: string;
  };
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const user = await getServerSession(authOptions);

  const checkUserEmail = () => {
    if (user) {
      return user.user.email;
    }

    if (searchParams.email) {
      return searchParams.email;
    }
  };

  if (!checkUserEmail()) {
    redirect("/signin");
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Verificação de e-mail</CardTitle>
        <CardDescription>
          Seu e-mail ainda não foi verificado. Favor, verificar seu e-mail para
          prosseguir com o cadastro da sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <VerifyEmailForm email={checkUserEmail()!} />
      </CardContent>
    </Card>
  );
}
