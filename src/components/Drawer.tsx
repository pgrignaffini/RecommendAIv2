import Link from "next/link";
import React from "react";
import type { TMDBShow } from "typings";
import { useLocalStorage } from "usehooks-ts";
import DrawerItem from "~/components/DrawerItem";
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";

function Drawer() {
  const [preferredShows, setPreferredShows] = useLocalStorage<TMDBShow[]>(
    "shows",
    []
  );
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
      <ul className="w-80 space-y-8 bg-base-100 p-4 text-base-content">
        <li
          className="btn flex w-full items-center space-x-3"
          onClick={() => {
            setPreferredShows([]);
          }}
        >
          <TrashIcon className="h-6 w-6" />
          <p>Clear preferences</p>
        </li>
        {preferredShows?.map((show) => (
          <li key={show.id}>
            <DrawerItem show={show} />
          </li>
        ))}
        <Link href="/reasons" className="btn w-full">
          <ArrowRightIcon className="h-6 w-6" />
        </Link>
      </ul>
    </div>
  );
}

export default Drawer;
