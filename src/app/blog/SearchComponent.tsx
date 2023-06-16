"use client";
import { FieldSearch } from "@/components/FieldSearch/inde";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export default function SearchComponent() {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const updateSearchParams = (search: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (search) {
      searchParams.set("search", search);
    } else {
      searchParams.delete("search");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search.trim().length < 3) {
      return;
    }

    updateSearchParams(search.toLowerCase());
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="rounded-3xl overflow-hidden">
        <div className="bg-[url(/blog.svg)] bg-no-repeat bg-center bg-cover h-[140px] md:h-[200px]" />
      </div>

      <div className="items-center gap-3 max-w-[360px] mx-auto px-3 flex w-full justify-center relative bottom-8">
        <FieldSearch
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        <button type="submit">
          <BsFillArrowRightCircleFill className="text-2xl fill-white" />
        </button>
      </div>
    </form>
  );
}
