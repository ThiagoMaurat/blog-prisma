"use client";
import { Button } from "@/components/Button";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { FieldTextAreaController } from "@/components/FieldTextArea/FieldTextAreaController";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { useTheme } from "next-themes";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Themes } from "@prisma/client";
import { createPostAction } from "@/actions/posts/create-posts/create-post";

interface PostFormProps {
  themes?: Themes[];
  authorId: string | undefined;
  role: string;
}

export type JSONContent = {
  type?: string;
  attrs?: Record<string, any>;
  content?: JSONContent[];
  marks?: {
    type: string;
    attrs?: Record<string, any>;
    [key: string]: any;
  }[];
  text?: string;
};

interface CreatePostFormInput {
  title: string;
  content: string;
  thumbnail: string;
  themeId: string;
  description: string;
}
export function PostForm(props: PostFormProps) {
  const { authorId, themes, role } = props;

  const defaultValues: CreatePostFormInput = {
    title: "",
    content: "",
    thumbnail: "",
    themeId: "",
    description: "",
  };

  const formCreatePost = useForm<CreatePostFormInput>({
    resolver: zodResolver(postSchema),
    defaultValues: defaultValues,
  });

  const { toast } = useToast();

  const { theme } = useTheme();

  const submitForm = async (data: CreatePostFormInput) => {
    if (!authorId || !role) return;
    console.log(data, role, authorId);
    try {
      const response = await createPostAction({
        ...data,
        role,
        authorId,
      });

      if (!response.error) {
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

              <Select
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full bg-background border border-offset-foreground placeholder:text-muted-foreground ring-offset-background rounded-lg">
                    <SelectValue
                      placeholder="Insira o tema associado"
                      className="w-full"
                    />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {themes?.map((theme) => (
                    <SelectItem key={theme?.id} value={String(theme?.id)}>
                      {theme?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        <Label className="font-bold text-base">Post</Label>
        <Editor
          onUpdate={(editor) => {
            formCreatePost.setValue(
              "content",
              JSON.stringify(editor!.getJSON())
            );
          }}
          className={`w-full my-8 mx-auto bg-background border-stone-200 sm:rounded-lg sm:border sm:shadow-lg ${
            theme === "dark" ? "dark-mode" : "light-mode"
          }`}
          disableLocalStorage
        />

        {formCreatePost.formState.errors.content && (
          <p className="text-red-500 text-xs">
            {formCreatePost.formState.errors.content.message}
          </p>
        )}

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
