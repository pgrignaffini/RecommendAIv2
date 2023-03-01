/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/">
        <img src="/logo.png" alt="RecommendAI" className="h-10" />
      </Link>
      <button className="rounded-lg border-2 py-2 px-4 text-lg text-white">
        Sign in
      </button>
    </header>
  );
}

export default Header;
