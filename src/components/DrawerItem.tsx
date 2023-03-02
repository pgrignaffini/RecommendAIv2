/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { TMDBShow } from "typings";
import { useLocalStorage } from "usehooks-ts";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { useShowImages } from "~/hooks/useShowImages";

type Props = {
  show: TMDBShow;
};

function DrawerItem({ show }: Props) {
  const { smallPosterUrl } = useShowImages(show);
  const [preferredShows, setPreferredShows] = useLocalStorage<TMDBShow[]>(
    "shows",
    []
  );

  return (
    <div className="flex items-center justify-between">
      <img src={smallPosterUrl} alt={show.title} className="h-12 w-8" />
      <p className="px-2">{show.name ?? show.title}</p>
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
        <MinusCircleIcon className="h-6 w-6" />
      </button>
    </div>
  );
}

export default DrawerItem;
