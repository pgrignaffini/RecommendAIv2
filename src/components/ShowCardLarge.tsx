/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { TMDBShow } from "typings";
import { useConfig } from "~/hooks/useConfig";

type Props = {
  show: TMDBShow;
};

function ShowCardLarge({ show }: Props) {
  const { config, baseUrl, posterSizes } = useConfig();
  const url = config
    ? `${baseUrl}${posterSizes[3] as string}${show?.poster_path}`
    : "";

  return (
    <img
      src={url}
      className="h-[500px] w-auto object-contain"
      alt={show.title}
    />
  );
}

export default ShowCardLarge;
