import React, { ForwardRefRenderFunction } from "react";
import { BsSearch } from "react-icons/bs";

interface FieldSearchComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const FieldSearchComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  FieldSearchComponentProps
> = (props, ref) => {
  return (
    <div className="w-full">
      <div className="relative">
        <div
          className="h-full absolute ml-3 flex items-center text-2xl"
          style={{ pointerEvents: "none" }}
        >
          <BsSearch className="text-black text-xl" />
        </div>
        <input
          className="pl-14 py-3 border rounded-full focus:outline-gray-500 w-full bg-white text-gray-900"
          placeholder="Search (mínimo 3 caracteres)"
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
};

export const FieldSearch = React.forwardRef(FieldSearchComponent);
