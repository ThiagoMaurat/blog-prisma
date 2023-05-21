import React, { forwardRef, ForwardRefRenderFunction } from "react";

const ButtonChakra: ForwardRefRenderFunction<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props, ref) => {
  return (
    <button
      className="hover:bg-blue-300 text-white rounded-s-md bg-blue-300"
      {...props}
      ref={ref}
    />
  );
};

export const ButtonTheme = forwardRef(ButtonChakra);
