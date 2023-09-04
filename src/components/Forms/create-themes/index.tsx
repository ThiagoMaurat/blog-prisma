"use client";
import React, { useRef } from "react";
import FieldInput from "@/components/FieldInput";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast/use-toast";
import { mutateForm } from "./form-server-action";

export interface FormLogin {
  name: string;
}

export default function CreateThemeForms() {
  const ref = useRef<HTMLFormElement>(null);

  const { toast } = useToast();

  return (
    <form
      className="grid gap-4"
      action={async (formData) => {
        ref.current?.reset();

        try {
          const mutate = await mutateForm(formData);

          if (!mutate?.ok) {
            return toast({
              title: "Erro",
              description: "Não foi possível adicionar o tema",
              duration: 3000,
            });
          }

          toast({
            title: "Sucesso",
            description: "Adicionado com sucesso",
            duration: 3000,
          });

          document?.getElementById?.("closeDialog")?.click();
        } catch (error) {
          toast({
            title: "Erro",
            description: "Não foi possível adicionar o tema",
            duration: 3000,
          });
        }
      }}
    >
      <Label htmlFor="name">Nome do tema</Label>

      <FieldInput placeholder="Nome do tema" name="name" />

      <div className="flex justify-end">
        <Button className="flex self-end" type="submit" label={"Salvar"} />
      </div>
    </form>
  );
}
