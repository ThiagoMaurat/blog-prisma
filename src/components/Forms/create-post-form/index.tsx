"use client";
import { ThemeResponse } from "@/@types/ThemesResponse";
import { Button } from "@/components/Button";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { Editor } from "novel";
import React from "react";
import { useForm } from "react-hook-form";

interface PostFormProps {
  themes: ThemeResponse;
  authorId: string;
}

interface CreatePostFormInput {
  title: string;
  content: string;
  thumbnail: string;
  themeId: {
    label: string;
    value: string;
  };
  description: string;
}
export function PostForm(props: PostFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormInput>({
    // resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      themeId: {
        label: "",
        value: "",
      },
      description: "",
    },
  });

  const submitForm = (data: CreatePostFormInput) => {
    console.log(data);
    // dont forget the authorId on submit
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(submitForm)}>
      <FieldInputController
        placeholder="Insira o título"
        label="Título"
        control={control}
        name="title"
        error={errors.title}
      />

      <FieldInputController
        placeholder="Insira o link da thumbnail"
        label="Thumbnail"
        control={control}
        name="thumbnail"
        error={errors.thumbnail}
      />

      <Editor onUpdate={(editor) => setValue("content", editor!.getHTML())} />

      <Button label="Salvar" type="submit" />
    </form>
  );
}
