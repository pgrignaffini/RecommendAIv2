import React from "react";
import type { TMDBShow } from "typings";
import Link from "next/link";
import { useReadLocalStorage } from "usehooks-ts";

function FAB() {
  const shows = useReadLocalStorage<TMDBShow[]>("shows");

  console.log(shows);

  return (
    <div className="group sticky bottom-12 left-12 flex h-auto w-fit flex-col items-center justify-center rounded-md bg-red-500 px-4 py-2  transition duration-1000">
      <p className="text-xl text-white group-hover:hidden">
        {shows?.length ?? 0}
      </p>
      <div className="hidden text-xl text-white group-hover:block">
        <div className="flex flex-col space-y-3">
          <p>Selected shows</p>
          {shows?.map((show) => (
            <div key={show.id} className="flex space-x-2">
              <p>{show.title}</p>
            </div>
          ))}
          <Link href="/reasons">
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
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FAB;
