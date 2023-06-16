"use client";
import { DefaultButton } from "@/components/DefaultButton";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsGithub } from "react-icons/bs";
import { schema } from "../schema";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormLogin {
  login: string;
  password: string;
}

export const FormComponent = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  // const toast = useToast();
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
      // return toast({
      //   title: "Erro",
      //   description: "Erro ao logar.",
      //   status: "error",
      //   duration: 3000,
      //   isClosable: true,
      // });
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
    <div
      className="h-full p-4 sm:p-0 flex gap-4 flex-col md:flex-row justify-evenly items-center"
      style={{ minHeight: "calc(100vh - 95px)" }}
    >
      <div className="hidden md:flex">
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

        <DefaultButton
          rightIcon={<BsGithub />}
          isLoading={isLoading}
          type="button"
          onClick={loginWithGitHub}
          label={"Git Hub"}
          variant="primary"
        />

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
  );
};
