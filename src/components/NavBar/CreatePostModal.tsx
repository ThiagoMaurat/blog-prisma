"use client";
import { Modal } from "../DefaultModal";
import { useState } from "react";
const CreatePostModal = ({}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div id="portal">
      <p
        onClick={() => setModalOpen(true)}
        className="cursor-pointer hover:bottom-1 hover:font-bold hover:border-b-2 hover:text-gray-300 hover:transition-all"
      >
        Criar Post
      </p>

      <Modal
        appElement={document.getElementById("portal") as HTMLElement}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div>Criar Post</div>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
