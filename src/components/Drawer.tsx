import Link from "next/link";
import React from "react";
import type { TMDBShow } from "typings";
import { useReadLocalStorage } from "usehooks-ts";
import DrawerItem from "./DrawerItem";

function Drawer() {
  const preferredShows = useReadLocalStorage<TMDBShow[]>("shows");
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
      <ul className="w-80 space-y-8 bg-base-100 p-4 text-base-content">
        {preferredShows?.map((show) => (
          <li key={show.id}>
            <DrawerItem show={show} />
          </li>
        ))}
        <li className="btn w-full">
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
        </li>
      </ul>
    </div>
  );
}

export default Drawer;
