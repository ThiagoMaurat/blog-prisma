"use client";
import { ThemeResponse } from "@/@types/ThemesResponse";
import { Button } from "@/components/Button";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
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
  themeId: string;
  description: string;
}
export function PostForm(props: PostFormProps) {
  const { authorId, themes } = props;

  const formCreatePost = useForm<CreatePostFormInput>({
    // resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      themeId: "",
      description: "",
    },
  });

  const submitForm = (data: CreatePostFormInput) => {
    console.log(data);
    // dont forget the authorId on submit
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

        <FormField
          control={formCreatePost.control}
          name="themeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-base">
                Escolhar o tema
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger
                    placeholder="Theme"
                    className="w-full bg-[#E1F5FE]"
                  >
                    <SelectValue placeholder="Theme" />
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

        <Button label="Salvar" type="submit" className="w-fit" />
      </form>
    </Form>
  );
}
