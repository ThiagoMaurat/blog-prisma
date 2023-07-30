"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { verfifyEmailSchema } from "@/components/Forms/verify-email-form/schema";
import { Button } from "@/components/Button";
import { Loader2 } from "lucide-react";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { useToast } from "@/components/Toast/use-toast";

type Inputs = z.infer<typeof verfifyEmailSchema>;

export function VerifyEmailForm({ email }: { email: string }) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(verfifyEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  const { toast } = useToast();

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      const response = await fetch("/api/auth/signup/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: data.code,
          email: email,
        }),
      });

      if (response.status === 200) {
        toast({
          title: "Sucesso",
          description: "Email verificado com sucesso.",
          duration: 2000,
        });

        router.push("/signin");
      }

      if (!response.ok) {
        toast({
          title: "Erro",
          description: "Erro ao verificar o email.",
          duration: 2000,
        });
      }
    });
  }

  return (
    <form
      {...form}
      className="grid gap-4"
      onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
    >
      <FieldInputController
        control={form.control}
        name="code"
        label="Código de verificação"
      />

      <Button disabled={isPending} label="Criar conta" isLoading={isPending} />
    </form>
  );
}
