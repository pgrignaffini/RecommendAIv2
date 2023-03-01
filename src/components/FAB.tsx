import React from "react";
import type { TMDBShow } from "typings";
import Link from "next/link";

type Props = {
  shows?: TMDBShow[];
};

function FAB({ shows }: Props) {
  return (
    <Link
      href="/reasons"
      className="group sticky bottom-12 left-12 flex h-auto w-fit flex-col items-center justify-center rounded-full bg-red-500 px-4 py-2  transition duration-500 hover:scale-125"
    >
      <p className="text-xl text-white group-hover:hidden">
        {shows?.length ?? 0}
      </p>
      <i className="hidden text-xl text-white group-hover:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </i>
    </Link>
  );
}

export default FAB;
