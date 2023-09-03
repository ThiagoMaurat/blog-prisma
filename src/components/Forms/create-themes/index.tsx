"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { Button } from "@/components/Button";
import { mutateThemes } from "@/queries/mutate-theme";
import { useToast } from "@/components/Toast/use-toast";

interface FormLogin {
  name: string;
}

export default function CreateThemeForms() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLogin>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: FormLogin) => {
    try {
      await mutateThemes({
        name: data.name,
      });

      toast({
        title: "Sucesso",
        description: "Tema criado com sucesso.",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar tema.",
        duration: 2000,
      });
    } finally {
      document?.getElementById?.("closeDialog")?.click();
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FieldInputController
        placeholder="Nome do tema"
        label="Nome"
        control={control}
        name="name"
        error={errors.name}
      />

      <div className="flex justify-end">
        <Button
          isLoading={isSubmitting}
          className="flex self-end "
          type="submit"
          label={"Salvar"}
        />
      </div>
    </form>
  );
}
