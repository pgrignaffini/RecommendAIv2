/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import type { TMDBShow } from "typings";
import { useReadLocalStorage } from "usehooks-ts";
import SearchBar from "~/components/SearchBar";

function Header() {
  const shows = useReadLocalStorage<TMDBShow[]>("shows");

  return (
    <header className="sticky z-10 flex items-center justify-between p-4">
      <Link href="/">
        <div className=" flex items-center ">
          <img src="/icon.png" alt="RecommendAI" className="h-10" />
          <p className="hidden text-xl md:block">RecommendAI</p>
        </div>
      </Link>
      <SearchBar placeholder="Search for a show..." />
      <label htmlFor="my-drawer-4" className="btn-primary drawer-button btn">
        <div className="flex items-center space-x-2">
          <p className="text-lg">{shows?.length ?? 0}</p>
          <p className="hidden text-lg md:block">shows</p>
        </div>
      </label>
    </header>
  );
}

export default Header;
