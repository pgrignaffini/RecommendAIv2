import React from "react";
import type { TMDBShow, Preference } from "typings";
import { useReadLocalStorage } from "usehooks-ts";
import { useReasons } from "~/hooks/useReasons";
import ChooseReasons from "./ChooseReasons";
import ShowCardLarge from "./ShowCardLarge";
import Spinner from "./Spinner";

type Props = {
  setPreferences: React.Dispatch<React.SetStateAction<Preference[]>>;
};

function PreferredShows({ setPreferences }: Props) {
  const preferredShows = useReadLocalStorage<TMDBShow[]>("shows");
  const { reasons, isLoadingReasons } = useReasons(
    preferredShows as TMDBShow[]
  );

  return (
    <>
      {preferredShows?.map((show) => (
        <div key={show.id} className="card bg-base-100 shadow-xl md:card-side">
          <ShowCardLarge show={show} />
          <div className="card-body">
            <h2 className="card-title text-xl">{show.title ?? show.name}</h2>
            <p>Why did you like this show?</p>
            {isLoadingReasons ? (
              <button className="btn-primary btn mx-auto" disabled>
                Loading reasons <Spinner />
              </button>
            ) : (
              <ChooseReasons
                title={show.title ?? show.name}
                reasons={reasons}
                setPreferences={setPreferences}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default PreferredShows;
