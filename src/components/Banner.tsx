import React from "react";
import type { Show } from "typings";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  bannerShow: Show;
  setPreferredShows: Dispatch<SetStateAction<Show[] | null>>;
};

function Banner({ bannerShow, setPreferredShows }: Props) {
  const [added, setAdded] = React.useState(false);

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url("${bannerShow?.backdropURLs[1280]}")`,
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
              setPreferredShows((prev) => {
                if (prev) {
                  return prev.filter((s) => s.imdbID !== bannerShow.imdbID);
                }
                return null;
              });
              setAdded(false);
            }}
          >
            Liked
          </button>
        )}
      </div>
      <img
        className="absolute bottom-12 right-10 w-32"
        src={bannerShow?.posterURLs[154]}
      />
    </div>
  );
}

export default Banner;
