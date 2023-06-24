"use client";

import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import { useCallback } from "react";

interface ShowMoreProps {
  search: string;
  page: number;
  limit: number;
  total: number;
}

const ShowMore = (props: ShowMoreProps) => {
  const router = useRouter();

  const handleNavigation = (page: number) => {
    const url = `${window.location.pathname}?page=${page.toString()}${
      props.search ? `&search=${props.search}` : ""
    }`;
    router.push(url);
  };

  const getPageQueryParams = useCallback(() => {
    if (props.page) {
      return Number(props.page);
    }

    return 1;
  }, [props.page]);

  return (
    <div className="w-full items-center justify-center mt-10">
      <Pagination
        totalCountOfRegisters={props.total}
        registersPerPage={9}
        onPageChange={handleNavigation}
        currentPage={getPageQueryParams()}
      />
    </div>
  );
};

export default ShowMore;
