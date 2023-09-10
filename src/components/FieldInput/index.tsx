import React from "react";

const FieldInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
> = (props, ref) => {
  return (
    <input
      className="bg-background border placeholder:text-muted-foreground ring-offset-background px-3 rounded-lg h-10 w-full"
      ref={ref}
      {...props}
    />
  );
};

export default React.forwardRef(FieldInput);
