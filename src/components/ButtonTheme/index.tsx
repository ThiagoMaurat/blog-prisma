import React, { forwardRef, ForwardRefRenderFunction } from "react";
import clsx from "clsx";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  props,
  ref
) => {
  const ButtonClassName = clsx(
    "hover:bg-blue-300",
    "text-white",
    "rounded-md",
    "bg-blue-300",
    "py-1",
    "px-3",
    props.className
  );

  return <button className={ButtonClassName} {...props} ref={ref} />;
};

export const ButtonTheme = forwardRef(Button);
