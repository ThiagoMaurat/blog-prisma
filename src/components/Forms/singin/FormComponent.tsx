"use client";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GithubIcon } from "lucide-react";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast/use-toast";
import { Card, CardContent, CardHeader } from "@/components/CardNav/card";

interface FormLogin {
  login: string;
  password: string;
}

export const FormComponent = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { push } = useRouter();

  async function loginWithGitHub() {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/" });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = async (data: FormLogin) => {
    const response = await signIn("credentials", {
      email: data.login,
      password: data.password,
      redirect: false,
    });

    if (response?.error) {
      return toast({
        title: "Erro",
        description: "Credenciais inválidas",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    return push("/");
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLogin>({
    resolver: zodResolver(schema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  return (
    <Card className="h-fit my-auto mx-auto md:mx-0 sm:mx- max-w-[420px] w-full">
      <CardHeader>
        <div className="gap-4 flex flex-col">
          <h2 className="text-2xl font-bold">Welcome back!</h2>

          <p className="">Lets build something great!</p>
        </div>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Button
            rightIcon={<GithubIcon />}
            label={"Git Hub"}
            variant={"secondary"}
            onClick={loginWithGitHub}
            isLoading={isLoading}
            type="button"
          >
            Git hub
          </Button>

          <FieldInputController
            placeholder="Enter Email"
            label="E-mail"
            control={control}
            name="login"
            type="email"
            error={errors.login}
          />

          <FieldInputController
            label="Senha"
            placeholder="Password"
            control={control}
            name="password"
            type="password"
            error={errors.password}
          />

          <Button
            isLoading={isSubmitting}
            variant={"primary"}
            type="submit"
            label={"Enviar"}
          />
        </form>
      </CardContent>
    </Card>
  );
};
