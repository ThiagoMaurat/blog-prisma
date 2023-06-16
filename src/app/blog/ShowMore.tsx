"use client";

import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import { useEffect } from "react";

interface ShowMoreProps {
  search: string;
  page: number;
  limit: number;
  total: number;
}

const ShowMore = (props: ShowMoreProps) => {
  const router = useRouter();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("page", props.page.toString());

    const url = `${window.location.pathname}?${urlSearchParams.toString()}`;

    router.push(url);
  }, [props.page, router]);

  const handleNavigation = (page: number) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("page", page.toString());
    const url = `${window.location.pathname}?${urlSearchParams.toString()}`;
    router.push(url);
  };

  const getPageQueryParams = () => {
    const searchParams = new URLSearchParams(window?.location?.search);

    const page = searchParams.get("page");

    if (page) {
      return Number(page);
    }

    return undefined;
  };

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
