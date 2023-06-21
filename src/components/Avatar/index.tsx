import clsx from "clsx";
import { Session } from "next-auth";
import Image from "next/image";
import React from "react";

type User = Session["user"];

interface AvatarProps {
  className?: string;
  user: Pick<User, "name" | "image">;
}

export default function Avatar(props: AvatarProps) {
  const { className, user } = props;

  const avatarStyle = clsx(
    "w-11",
    "h-10",
    "bg-cover",
    "rounded-full",
    className
  );

  const avatarUserNameStyle = clsx(
    "w-10",
    "h-10",
    "bg-gray-500",
    "flex",
    "items-center",
    "justify-center",
    "font-bold",
    "text-white",
    "rounded-full",
    className
  );

  if (user.image) {
    return (
      <Image
        width={50}
        height={50}
        className={avatarStyle}
        src={user.image!}
        alt={user.name!}
      />
    );
  }

  return (
    <div className={avatarUserNameStyle}>
      <span>{`${user.name?.substring(0, 1)} ${user.name?.substring(
        1,
        2
      )}`}</span>
    </div>
  );
}
