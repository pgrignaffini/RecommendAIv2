/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import type { TMDBShow } from "typings";
import { useReadLocalStorage } from "usehooks-ts";

function Header() {
  const shows = useReadLocalStorage<TMDBShow[]>("shows");

  return (
    <header className="sticky flex items-center justify-between p-4">
      <Link href="/">
        <img src="/logo.png" alt="RecommendAI" className="h-10" />
      </Link>
      <div className="flex items-center space-x-4">
        <button className="rounded-lg border-2 py-2 px-4 text-lg text-white">
          Sign in
        </button>
        <label htmlFor="my-drawer-4" className="btn-primary drawer-button btn">
          {shows?.length ?? 0} shows
        </label>
      </div>
    </header>
  );
}

export default Header;
