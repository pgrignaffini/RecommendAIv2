import type { TMDBShow } from "typings";
import { useConfig } from "~/hooks/useConfig";

export const useShowImages = (show: TMDBShow) => {
  const { config, baseUrl, posterSizes, backdropSizes } = useConfig();
  const smallPosterUrl = config
    ? `${baseUrl}${posterSizes[1] as string}${show?.poster_path}`
    : "";
  const mediumPosterUrl = config
    ? `${baseUrl}${posterSizes[2] as string}${show?.poster_path}`
    : "";
  const largePosterUrl = config
    ? `${baseUrl}${posterSizes[3] as string}${show?.poster_path}`
    : "";
  const smallBackdropUrl = config
    ? `${baseUrl}${backdropSizes[1] as string}${show?.backdrop_path}`
    : "";
  const mediumBackdropUrl = config
    ? `${baseUrl}${backdropSizes[2] as string}${show?.backdrop_path}`
    : "";
  const largeBackdropUrl = config
    ? `${baseUrl}${backdropSizes[3] as string}${show?.backdrop_path}`
    : "";

  const imageUrl =
    mediumPosterUrl ||
    mediumBackdropUrl ||
    smallBackdropUrl ||
    smallPosterUrl ||
    largeBackdropUrl ||
    largePosterUrl;

  const url = imageUrl.includes("null") ? "/blank.jpeg" : imageUrl;

  return {
    smallPosterUrl,
    mediumPosterUrl,
    largePosterUrl,
    smallBackdropUrl,
    mediumBackdropUrl,
    largeBackdropUrl,
    url,
  };
};
