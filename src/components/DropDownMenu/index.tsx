"use client";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import React, { useRef, useState } from "react";
import clsx from "clsx";

interface PopoverProps {
  children: React.ReactNode;
  openButtonChildren: React.ReactNode;
  className?: string;
}

export const Popover = (props: PopoverProps) => {
  const { children, openButtonChildren, className } = props;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverToggle = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const popoverRef = useRef(null);

  useOnClickOutside(popoverRef, () => {
    setIsPopoverOpen(false);
  });

  const popoverStyle = clsx(
    "flex",
    "justify-center",
    "items-center",
    className
  );

  return (
    <div className={popoverStyle} ref={popoverRef}>
      <div className="relative">
        <button onClick={handlePopoverToggle} className="py-2 px-4 rounded">
          {openButtonChildren}
        </button>

        {isPopoverOpen && (
          <div className="min-w-[250px] bg-white text-gray-800 rounded shadow-lg absolute left-1/2 transform -translate-x-1/2 p-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
