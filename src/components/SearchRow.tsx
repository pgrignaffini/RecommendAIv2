/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { TMDBShow } from "typings";
import { useShowImages } from "~/hooks/useShowImages";

type Props = {
  show: TMDBShow;
  setWordEntered: React.Dispatch<React.SetStateAction<string>>;
};

function SearchRow({ show, setWordEntered }: Props) {
  const { url } = useShowImages(show);

  return (
    <li
      onClick={() => setWordEntered("")}
      className="relative flex cursor-pointer flex-row items-center justify-between p-3 hover:bg-secondary hover:text-gray-900 hover:opacity-50"
    >
      <img alt="show poster" src={url} className="h-12 w-12 object-cover" />
      <a>
        <p className="font-montserrat text-sm">{show.title ?? show.name}</p>
      </a>
    </li>
  );
}

export default SearchRow;
