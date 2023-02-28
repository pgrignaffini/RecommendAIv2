/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Show } from "typings";

type Props = {
  show: Show;
  isLarge?: boolean;
  setPreferredShows: Dispatch<SetStateAction<Show[] | null>>;
};

function ShowCard({ show, isLarge = false, setPreferredShows }: Props) {
  const [added, setAdded] = React.useState(false);

  return (
    <div
      key={show.imdbID}
      className={`group relative flex-none cursor-pointer transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-110 ${
        isLarge ? "max-h-[250px]" : "max-h-[150px]"
      } `}
    >
      <img
        src={isLarge ? show.posterURLs[154] : show.backdropURLs[300]}
        className="h-full w-full object-cover"
        alt={show.title}
      />
      <div
        className="absolute inset-y-1/2 z-0 w-full opacity-0
        transition duration-300 ease-in-out group-hover:bg-transparent group-hover:opacity-80"
      >
        <div className="flex h-full items-center justify-center">
          {!added ? (
            <button
              className="rounded-full bg-[#072942] p-3 text-lg text-white"
              onClick={() => {
                setAdded(true);
                setPreferredShows((prev) => {
                  if (prev) {
                    return [...prev, show];
                  }
                  return [show];
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          ) : (
            <button
              className="text-md rounded-full bg-[#546E24] p-3 text-white"
              onClick={() => {
                setPreferredShows((prev) => {
                  if (prev) {
                    return prev.filter((s) => s.imdbID !== show.imdbID);
                  }
                  return null;
                });
                setAdded(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {/* <div className="absolute inset-y-1/2 z-10 ml-10">Lalalalalalal</div> */}
    </div>
  );
}

export default ShowCard;
