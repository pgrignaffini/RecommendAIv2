/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { TMDBShow } from "typings";
import { useShowImages } from "~/hooks/useShowImages";

type Props = {
  show: TMDBShow;
};

function ShowCardLarge({ show }: Props) {
  const { largePosterUrl } = useShowImages(show);

  return (
    <img
      src={largePosterUrl}
      className="h-[500px] w-auto object-contain"
      alt={show.title}
    />
  );
}

export default ShowCardLarge;
