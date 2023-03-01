import React from "react";
import type { TMDBShow } from "typings";
import { useConfig } from "~/hooks/useConfig";
import { useLocalStorage } from "usehooks-ts";

type Props = {
  bannerShow: TMDBShow;
};

function Banner({ bannerShow }: Props) {
  const [preferredShows, setPreferredShows] = useLocalStorage<TMDBShow[]>(
    "shows",
    []
  );
  const isAdded = preferredShows?.some((s) => s.id === bannerShow.id);
  const [added, setAdded] = React.useState(isAdded);
  const { config, baseUrl, backdropSizes, posterSizes } = useConfig();
  const url = config
    ? `${baseUrl}${backdropSizes[2] as string}${bannerShow?.backdrop_path}`
    : "";

  const posterUrl = config
    ? `${baseUrl}${posterSizes[1] as string}${bannerShow?.poster_path}`
    : "";

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url("${url}")`,
      }}
      className="relative h-[600px] w-full"
    >
      <div className="absolute bottom-0 h-80 w-full bg-transparent bg-gradient-to-b from-[rgba(7,41,66,0.03)] to-[#072942]" />
      <div className="absolute inset-y-1/4 flex flex-col gap-4 px-10">
        <div>
          <h1 className="text-6xl font-bold text-white">{bannerShow?.title}</h1>
        </div>
        <p className="w-2/3 text-2xl text-white">{bannerShow?.overview}</p>
        {!added ? (
          <button
            className="w-fit rounded-md border-2 bg-[#072942] p-3 text-lg text-white"
            onClick={() => {
              setAdded(true);
              setPreferredShows((prev) => {
                if (prev) {
                  return [...prev, bannerShow];
                }
                return [bannerShow];
              });
            }}
          >
            Add to liked
          </button>
        ) : (
          <button
            className="w-fit rounded-md border-2 bg-[#546E24] p-3 text-lg text-white"
            onClick={() => {
              const newValue = preferredShows.filter(
                (s) => s.id !== bannerShow.id
              );
              if (newValue.length === 0) {
                return null;
              } else {
                setPreferredShows(newValue);
              }
              setAdded(false);
            }}
          >
            Liked
          </button>
        )}
      </div>
      <img className="absolute bottom-12 right-10 w-32" src={posterUrl} />
    </div>
  );
}

export default Banner;
