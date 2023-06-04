import React from "react";

const FieldInput: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  React.InputHTMLAttributes<HTMLTextAreaElement>
> = (props, ref) => {
  return (
    <textarea
      className="bg-[#E1F5FE] px-3 py-3 rounded-lg w-full focus:outline-blue-500"
      ref={ref}
      {...props}
    />
  );
};

export default React.forwardRef(FieldInput);
