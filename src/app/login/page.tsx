"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { DefaultButton } from "@/components/DefaultButton";
import { BsGithub } from "react-icons/bs";
import { Limiter } from "@/components/Limiter";
import { Header } from "@/components/Header";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface FormLogin {
  login: string;
  password: string;
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
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
        description: "Erro ao logar.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    if (response?.ok) {
      return push("/");
    }
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
    <Limiter>
      <Header />

      <div
        className="h-full sm:p-4 flex gap-4 md:flex-col justify-evenly items-center"
        style={{ minHeight: "calc(100vh - 95px)" }}
      >
        <div className="flex md:hidden">
          <Image
            src={"/login.png"}
            width={300}
            height={500}
            style={{ borderRadius: "1rem" }}
            alt="login-image"
          />
        </div>

        <form
          className="max-w-[360px] w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="gap-4 flex flex-col">
            <h2 className="text-2xl font-bold">Welcome back!</h2>

            <p className="">Lets build something great!</p>
          </div>

          <Button
            rightIcon={<BsGithub />}
            isLoading={isLoading}
            type="button"
            onClick={loginWithGitHub}
          >
            Git Hub
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

          <DefaultButton
            isLoading={isSubmitting}
            type="submit"
            label={"Enviar"}
          />
        </form>
      </div>
    </Limiter>
  );
}
