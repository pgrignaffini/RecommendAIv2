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
    <figure>
      <img src={largePosterUrl} alt={show.title} />
    </figure>
  );
}

export default ShowCardLarge;
