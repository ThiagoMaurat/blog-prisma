"use client";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { Button, Flex } from "@chakra-ui/react";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { useForm } from "react-hook-form";
import { DefaultButton } from "@/components/DefaultButton";

interface FormLogin {
  username: string;
  password: string;
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  async function loginWithGitHub() {
    setIsLoading(true);
    try {
      await signIn("github");
    } catch (error) {
      // display error message to user
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = async (data: FormLogin) => {
    console.log(data);
    await signIn("credentials", {
      email: data.username,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  const {
    watch,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLogin>({
    // resolver: yupResolver(schema),
  });

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      maxW="360px"
      w="100%"
      flexDir={"column"}
      gap={"1rem"}
    >
      <Button isLoading={isLoading} type="button" onClick={loginWithGitHub}>
        Git Hub
      </Button>
      <FieldInputController
        placeholder="Enter Email"
        control={control}
        name="login"
        type="email"
      />

      <FieldInputController
        placeholder="Password"
        control={control}
        name="password"
        type="password"
      />

      <DefaultButton type="submit" label={"Enviar"} />

      <DefaultButton onClick={() => signOut()} label={"Sair"} />
    </Flex>
  );
}
