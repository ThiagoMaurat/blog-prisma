"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SignOnType,
  SignOnTypeForm,
  authSignUpSchema,
  authSignUpSchemaForm,
} from "./schema";
import { Button } from "@/components/Button";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { render } from "@react-email/render";
import { LinearLoginCodeEmail } from "@/email-templates/auth-confirm-email";
import {
  random,
  saveRandomNumberOnDB,
  sendEmailConfirmation,
} from "@/actions/email-verified";
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

export function SignUpForm() {
  const [isPending, startTransition] = React.useTransition();
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

  function onSubmit(data: SignOnTypeForm) {
    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            name: data.name,
            birthdate: data.birthday,
          }),
        });

        const result = await response.json();

        if (response?.status === 400) {
          toast({
            title: "Erro",
            description: result?.message
              ? result?.message
              : "Erro ao criar conta.",
            duration: 2000,
          });
        }

        if (response?.status === 200) {
          toast({
            title: "Sucesso",
            description: "Conta criada com sucesso.",
            duration: 2000,
          });

          const ramdom = await random();

          const emailHtml = render(
            <LinearLoginCodeEmail validationCode={ramdom} />
          );

          try {
            await sendEmailConfirmation(data?.email, emailHtml);
            await saveRandomNumberOnDB(ramdom, data?.email);
            router.push(`/signup/verify-email/?email=${data?.email}`);
          } catch (error) {
            toast({
              title: "Erro",
              description: "Erro ao enviar email de confirmação.",
              duration: 2000,
            });
          }
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao criar conta.",
          duration: 2000,
        });
      }
    });
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
        />

        <FieldInputController
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="blog@example.com"
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

        <Button disabled={isPending} isLoading={isPending} label="Continue">
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  );
}
