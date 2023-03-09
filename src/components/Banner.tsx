/* eslint-disable @next/next/no-img-element */
import React from "react";
import { toast } from "react-hot-toast";
import type { TMDBShow } from "typings";
import { useLocalStorage } from "usehooks-ts";
import { useShowImages } from "~/hooks/useShowImages";

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
  const { largeBackdropUrl, largePosterUrl } = useShowImages(bannerShow);

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url("${largeBackdropUrl}")`,
      }}
      className="relative h-[600px] w-full"
    >
      <div className="absolute top-0 h-80 w-full bg-transparent bg-gradient-to-b from-[#072942] to-[rgba(7,41,66,0.03)] md:hidden" />
      <div className="absolute bottom-0 h-80 w-full bg-transparent bg-gradient-to-b from-[rgba(7,41,66,0.03)] to-[#072942]" />
      <div className="absolute mt-12 flex flex-col gap-4 px-10 md:inset-y-1/4">
        <div>
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            {bannerShow?.title ?? bannerShow.name}
          </h1>
        </div>
        <p className="hidden w-2/3 text-2xl text-white xl:block">
          {bannerShow?.overview.slice(0, 700) + "..."}
        </p>
        <p className="text-md w-4/5 text-white md:text-lg xl:hidden">
          {bannerShow?.overview.slice(0, 300) + "..."}
        </p>
        {!added ? (
          <button
            className="w-fit rounded-md border-2 bg-[#072942] p-3 text-lg text-white"
            onClick={() => {
              if (preferredShows.length >= 5) {
                toast.error("You can only add 5 shows to your list");
                return null;
              }
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
      <img
        className="absolute bottom-12 right-10 w-32 rounded-md"
        src={largePosterUrl}
        alt={bannerShow.title}
      />
    </div>
  );
}

export default Banner;
