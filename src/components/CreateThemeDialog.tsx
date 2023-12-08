import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./Button";
import CreateThemeForms from "./Forms/create-themes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

export default async function CreateThemeDialog() {
  const user = await getServerSession(authOptions);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="max-w-[200px] w-full"
          variant="primary"
          label={"Create Themes"}
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogClose id="closeDialog" />
        <DialogHeader>
          <DialogTitle>Criação de temas</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <CreateThemeForms role={user?.user.role || ""} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
