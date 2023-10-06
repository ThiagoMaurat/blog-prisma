"use client";
import { useTheme } from "next-themes";
import { Editor } from "novel";
import React from "react";

interface EditorNovelProps {
  defaultValue: string;
  className?: string;
}

export default function EditorNovel(props: EditorNovelProps) {
  const { defaultValue, className } = props;

  const { theme } = useTheme();

  return (
    <Editor
      editorProps={{
        editable: () => false,
      }}
      defaultValue={defaultValue}
      className={`w-full my-8 mx-auto bg-background border-stone-200 sm:rounded-lg sm:border sm:shadow-lg ${
        theme === "dark" ? "dark-mode" : "light-mode"
      } ${className}`}
      disableLocalStorage
    />
  );
}
