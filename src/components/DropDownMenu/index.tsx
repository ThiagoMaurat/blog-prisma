"use client";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import React, { useRef, useState } from "react";

interface PopoverProps {
  children: React.ReactNode;
  openButtonChildren: React.ReactNode;
}

export const Popover = (props: PopoverProps) => {
  const { children, openButtonChildren } = props;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverToggle = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const popoverRef = useRef(null);

  useOnClickOutside(popoverRef, () => {
    setIsPopoverOpen(false);
  });

  return (
    <div className="flex justify-center items-center" ref={popoverRef}>
      <div className="relative">
        <button onClick={handlePopoverToggle} className="py-2 px-4 rounded">
          {openButtonChildren}
        </button>

        {isPopoverOpen && (
          <div className="bg-white text-gray-800 rounded shadow-lg absolute top-full -left-2 mt-2 p-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
