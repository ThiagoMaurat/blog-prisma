import React from "react";

const FieldInput: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  React.InputHTMLAttributes<HTMLTextAreaElement>
> = (props, ref) => {
  return (
    <textarea
      className="bg-background border placeholder:text-muted-foreground ring-offset-background px-3 py-3 rounded-lg w-full"
      ref={ref}
      {...props}
    />
  );
};

export default React.forwardRef(FieldInput);
