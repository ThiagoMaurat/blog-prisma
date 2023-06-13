import React from "react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange?: (page: number) => void;
}

export default function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button
        className="bg-gray-500 text-white rounded-md px-2.5 py-1 text-xs font-medium disabled:cursor-default disabled:bg-gray-500 hover:bg-gray-500"
        disabled
      >
        {number}
      </button>
    );
  }
  return (
    <button
      className="bg-gray-700 text-white rounded-md px-2.5 py-1 text-xs font-medium hover:bg-gray-500"
      onClick={() => onPageChange!(number)}
    >
      {number}
    </button>
  );
}
