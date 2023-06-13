import React from "react";
import PaginationItem from "./PaginationItem";
import clsx from "clsx";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const siblingsCount = 1;

function geratePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

export default function Pagination({
  totalCountOfRegisters,
  registersPerPage = 6,
  currentPage = 1,
  onPageChange,
  ...props
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);
  const previousPage =
    currentPage > 1
      ? geratePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPage =
    currentPage < lastPage
      ? geratePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  const DivClassName = clsx(
    "flex",
    "w-full",
    "text-white",
    "items-center",
    "flex-col",
    "space-y-3",
    props.className
  );

  return (
    <div className={DivClassName} {...props}>
      <div className="flex space-x-2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {currentPage > 2 + siblingsCount && (
              <div className="text-gray-300 w-8 text-center">...</div>
            )}
            {}
          </>
        )}

        {previousPage.length > 0 &&
          previousPage.map((page) => (
            <PaginationItem
              key={page}
              number={page}
              onPageChange={onPageChange}
            />
          ))}

        <PaginationItem
          number={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {nextPage.length > 0 &&
          nextPage.map((page) => (
            <PaginationItem
              key={page}
              number={page}
              onPageChange={onPageChange}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
            {currentPage + 1 + siblingsCount < lastPage && (
              <div className="text-gray-300 w-8 text-center">...</div>
            )}
          </>
        )}
      </div>

      <div>
        <strong className="text-slate-900">
          {`${(currentPage - 1) * registersPerPage} - `}
        </strong>

        <strong className="text-slate-900">
          {`${Math.min(
            currentPage * registersPerPage,
            totalCountOfRegisters
          )} de `}
        </strong>

        <strong className="text-slate-900">
          {totalCountOfRegisters} registros
        </strong>
      </div>
    </div>
  );
}
