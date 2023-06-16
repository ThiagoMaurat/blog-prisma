"use client";
import Link from "next/link";
import { Icon, IconifyIcon } from "@iconify/react";

interface NavIndicesProps {
  text: string;
  href: string;
  isExternal: boolean;
  LeftIcon?: string | IconifyIcon;
}

export const NavIndices = ({
  isExternal,
  text,
  href,
  LeftIcon,
}: NavIndicesProps) => {
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        className="hover:text-gray-500 text-slate-600"
        rel="noopener noreferrer"
      >
        <div className="flex gap-2 items-center">
          <>
            {LeftIcon && <Icon icon={LeftIcon} />}
            <p className="font-bold">{text}</p>
          </>
        </div>
      </a>
    );
  }

  if (!isExternal) {
    return (
      <Link href={href} className="hover:text-gray-500 text-slate-600">
        <div className="flex gap-2 items-center">
          <>
            {LeftIcon && <Icon icon={LeftIcon} />}
            <p className="font-bold">{text}</p>
          </>
        </div>
      </Link>
    );
  }

  return null;
};
