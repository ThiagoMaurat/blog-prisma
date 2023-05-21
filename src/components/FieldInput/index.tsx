import React from "react";

const FieldInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
> = (props, ref) => {
  return (
    <input
      className="bg-[#E1F5FE] px-3 rounded-lg h-10 w-full focus:outline-blue-500"
      ref={ref}
      {...props}
    />
  );
};

export default React.forwardRef(FieldInput);
