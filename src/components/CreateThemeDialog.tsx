import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./Button";
import CreateThemeForms from "./Forms/create-themes";

export default function CreateThemeDialog() {
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
        <DialogHeader>
          <DialogTitle>Criação de temas</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <CreateThemeForms />
        </div>
      </DialogContent>
    </Dialog>
  );
}
