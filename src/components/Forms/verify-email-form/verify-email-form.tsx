"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { verfifyEmailSchema } from "@/components/Forms/verify-email-form/schema";
import { Button } from "@/components/Button";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { useToast } from "@/components/Toast/use-toast";
import { validateEmailCodeAction } from "@/actions/auth/validate-email/validate-email";

type Inputs = z.infer<typeof verfifyEmailSchema>;

export function VerifyEmailForm({ email }: { email: string }) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(verfifyEmailSchema),
    defaultValues: {
      code: "",
      email: email || "",
    },
  });

  const { toast } = useToast();

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await validateEmailCodeAction({
          ...data,
        });

        toast({
          title: "Sucesso",
          description: "Email verificado com sucesso. Favor logar.",
          duration: 2000,
        });

        router.push("/signin");
      } catch (error: any) {
        console.log(error);
        toast({
          title: "Erro",
          description: error?.message || "Erro ao verificar o email.",
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
        name="email"
        label="Selecione o e-mail"
      />

      <FieldInputController
        control={form.control}
        name="code"
        label="Código de verificação"
      />

      <Button disabled={isPending} label="Criar conta" isLoading={isPending} />
    </form>
  );
}
