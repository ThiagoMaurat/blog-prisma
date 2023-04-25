"use client";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@chakra-ui/react";

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

  return (
    <Button isLoading={isLoading} type="button" onClick={loginWithGitHub}>
      Git Hub
    </Button>
  );
}
