import React, { ReactNode } from "react";
import ReactModal, { Props as ReactModalProps } from "react-modal";
import ModalHeader from "./ModalHeader";

type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "xsm";

export type ModalWelcomeWhatsGroupProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: Size;
  children?: ReactNode;
  title?: string;
} & ReactModalProps;

const getWidthBySize = (size: Size) => {
  const sizes: Record<Size, string> = {
    xsm: "292px",
    sm: "417px",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  };

  return sizes[size];
};

/*
  |-----------------------------------------------------------------------------
  | Memos
  |-----------------------------------------------------------------------------
  |
  |
  */

export const Modal = (props: ModalWelcomeWhatsGroupProps) => {
  const {
    isOpen,
    title,
    onClose,
    size = "sm",
    children,
    ...reactModalProps
  } = props;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      appElement={document.getElementById("root") as HTMLElement}
      style={{
        content: {
          padding: "24px",
          position: "absolute",
          width: "100%",
          maxWidth: getWidthBySize(size),
          height: "fit-content",
          left: "50%",
          top: "54%",
          overflow: "unset",
          transform: "translate(-50%, -50%)",
          background: "white",
          border: "0px",
        },
        overlay: {
          position: "fixed",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 999999999,
          backgroundColor: "rgba(14, 14, 15, 0.4)",
          height: "100%",
          overflow: "auto",
        },
      }}
      {...reactModalProps}
    >
      {title && <ModalHeader title={props.title} onIconClick={onClose} />}
      {children}
    </ReactModal>
  );
};
