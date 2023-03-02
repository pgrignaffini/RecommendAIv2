/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { TMDBShow } from "typings";
import { useLocalStorage } from "usehooks-ts";
import { useConfig } from "~/hooks/useConfig";

type Props = {
  show: TMDBShow;
};

function DrawerItem({ show }: Props) {
  const { config, baseUrl, posterSizes } = useConfig();
  const url = config
    ? `${baseUrl}${posterSizes[1] as string}${show?.poster_path}`
    : "";
  const [preferredShows, setPreferredShows] = useLocalStorage<TMDBShow[]>(
    "shows",
    []
  );

  return (
    <div className="flex items-center justify-between">
      <img src={url} alt={show.title} className="h-12 w-8" />
      <p>{show.name ?? show.title}</p>
      <button
        onClick={() => {
          const newValue = preferredShows.filter((s) => s.id !== show.id);
          if (newValue.length === 0) {
            return null;
          } else {
            setPreferredShows(newValue);
          }
        }}
      >
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
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
}

export default DrawerItem;
