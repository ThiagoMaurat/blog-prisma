"use client";
import React, { useRef } from "react";
import FieldInput from "@/components/FieldInput";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast/use-toast";
import { createThemesAction } from "@/actions/themes/create-themes/create-theme";

export interface CreateThemeFormsProps {
  role: string;
}

export default function CreateThemeForms({ role }: CreateThemeFormsProps) {
  const ref = useRef<HTMLFormElement>(null);

  const { toast } = useToast();

  return (
    <form
      className="grid gap-4"
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();

        const formDataName = formData.get("name")?.toString();

        if (!formDataName || !role) return;

        try {
          const mutate = await createThemesAction({
            name: formDataName,
            role: role,
          });

          document?.getElementById?.("closeDialog")?.click();

          toast({
            title: "Sucesso",
            description: "Adicionado com sucesso",
            duration: 3000,
          });
        } catch (error: any) {
          toast({
            title: "Erro",
            description: error?.message || "Erro ao adicionar",
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
