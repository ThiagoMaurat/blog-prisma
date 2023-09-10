"use client";
import { ThemeResponse } from "@/@types/ThemesResponse";
import { Button } from "@/components/Button";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { FieldTextAreaController } from "@/components/FieldTextArea/FieldTextAreaController";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "novel";
import React from "react";
import { useForm } from "react-hook-form";
import { postSchema } from "./schema";
import { useToast } from "@/components/Toast/use-toast";

interface PostFormProps {
  themes: ThemeResponse;
  authorId: string;
}

interface CreatePostFormInput {
  title: string;
  content: string;
  thumbnail: string;
  themeId: string;
  description: string;
}
export function PostForm(props: PostFormProps) {
  const { authorId, themes } = props;

  const formCreatePost = useForm<CreatePostFormInput>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      themeId: "",
      description: "",
    },
  });

  const { toast } = useToast();

  const submitForm = async (data: CreatePostFormInput) => {
    try {
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          authorId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Post criado com sucesso.",
          duration: 2000,
        });
        formCreatePost.reset();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar post.",
        duration: 2000,
      });
    }
  };
  console.log(formCreatePost.formState.errors, authorId);
  return (
    <Form {...formCreatePost}>
      <form
        onSubmit={(...args) =>
          void formCreatePost.handleSubmit(submitForm)(...args)
        }
        className="grid gap-4 "
      >
        <FieldInputController
          placeholder="Insira o título"
          label="Título"
          control={formCreatePost.control}
          name="title"
          error={formCreatePost.formState.errors.title}
        />

        <FieldInputController
          placeholder="Insira o link da thumbnail"
          label="Thumbnail"
          control={formCreatePost.control}
          name="thumbnail"
          error={formCreatePost.formState.errors.thumbnail}
        />

        <FieldTextAreaController
          control={formCreatePost.control}
          name="description"
          label="Descrição"
          error={formCreatePost.formState.errors.description}
          placeholder="Insira a descrição"
        />

        <FormField
          control={formCreatePost.control}
          name="themeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-base">
                Escolhe o tema
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger
                    placeholder="Theme"
                    className="w-full text-black"
                  >
                    <SelectValue
                      placeholder="Theme"
                      className="w-full text-black"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {themes.themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Editor
          onUpdate={(editor) =>
            formCreatePost.setValue("content", editor!.getHTML())
          }
        />

        <Button
          isLoading={formCreatePost.formState.isSubmitting}
          label="Salvar"
          type="submit"
          className="w-fit"
        />
      </form>
    </Form>
  );
}
