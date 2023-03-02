import Link from "next/link";
import React from "react";
import type { TMDBShow } from "typings";
import { useReadLocalStorage } from "usehooks-ts";
import DrawerItem from "~/components/DrawerItem";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

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
            <ArrowRightIcon className="h-6 w-6" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Drawer;
