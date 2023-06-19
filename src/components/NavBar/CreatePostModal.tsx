"use client";
import { useForm } from "react-hook-form";
import { Modal } from "../DefaultModal";
import { useState } from "react";
import { FieldInputController } from "../FieldInput/FieldInputController";
import { FieldTextAreaController } from "../FieldTextArea/FieldTextAreaController";
import { DefaultButton } from "../DefaultButton";
import api from "@/lib/axios";
import { useSession } from "next-auth/react";

interface PostForm {
  title: string;
  content: string;
}

const CreatePostModal = ({}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session } = useSession();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PostForm>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const submit = async (formState: PostForm) => {
    try {
      await api.post("/api/admin/posts", {
        title: formState.title,
        content: formState.content,
        authorId: session?.user.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="portal">
      <p
        onClick={() => setModalOpen(true)}
        className="cursor-pointer font-medium hover:bottom-1 hover:font-bold hover:border-b-2 hover:text-gray-300 hover:transition-all"
      >
        Criar Post
      </p>

      <Modal
        appElement={document.getElementById("portal") as HTMLElement}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Criar Post"
      >
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
          <FieldInputController
            placeholder="Título"
            label="Título"
            control={control}
            name="title"
            error={errors.title}
          />

          <FieldTextAreaController
            placeholder="Conteúdo"
            label="Conteúdo"
            control={control}
            name="content"
            error={errors.content}
          />

          <DefaultButton label="Enviar" type="submit" />
        </form>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
