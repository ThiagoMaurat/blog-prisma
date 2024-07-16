"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignOnTypeForm, authSignUpSchemaForm } from "./schema";
import { Button } from "@/components/Button";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast/use-toast";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/PasswordInput";
import { DatePicker } from "@/components/Calendar/date-picker";
import { signUpAction } from "@/actions/auth/sign-up/sign-up";

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();

  // react-hook-form
  const form = useForm<SignOnTypeForm>({
    resolver: zodResolver(authSignUpSchemaForm),
    shouldFocusError: false,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      birthday: undefined,
    },
  });

  async function onSubmit(data: SignOnTypeForm) {
    try {
      await signUpAction({
        email: data.email,
        password: data.password,
        name: data.name,
        birthday: data.birthday,
      });
      toast({
        title: "Sucesso",
        description: "Conta criada com sucesso.",
        duration: 2000,
      });
      router.push(`/signup/verify-email/?email=${data?.email}`);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error?.message ?? "Erro ao criar conta.",
        duration: 2000,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4 max-w-[500px]"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FieldInputController
          placeholder="Nome"
          control={form.control}
          name="name"
          label="Nome"
          error={form.formState.errors.name}
        />

        <FieldInputController
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="blog@example.com"
          error={form.formState.errors.email}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme sua senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl>
                <DatePicker
                  mode="single"
                  labels={{
                    labelMonthDropdown: () => "Mês",
                    labelYearDropdown: () => "Ano",
                  }}
                  onSelect={field.onChange as any}
                  selected={field.value}
                  label={field.value}
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  classNames={{
                    caption_label: "hidden",
                    dropdown_icon: "hidden",
                    dropdown_month: "flex gap-3",
                    dropdown_year: "w-full flex justify-between gap-3",
                    dropdown: "w-full",
                    caption_dropdowns: "space-y-2 text-md",
                  }}
                  locale={ptBR}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          isLoading={form.formState.isSubmitting}
          label="Continue"
        >
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  );
}
