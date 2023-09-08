import React, { forwardRef, ForwardRefRenderFunction } from "react";
import clsx from "clsx";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  leftIcon?: React.ReactNode;
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  props,
  ref
) => {
  const { leftIcon, ...rest } = props;

  const ButtonClassName = clsx(
    "hover:opacity-80",
    "text-primary",
    "rounded",
    "bg-background",
    "border",
    "py-1",
    "px-3",
    "flex",
    "items-center",
    "gap-2",
    props.className
  );

  return (
    <button className={ButtonClassName} {...rest} ref={ref}>
      {leftIcon && leftIcon}
      {props.children}
    </button>
  );
};

export const ButtonTheme = forwardRef(Button);
