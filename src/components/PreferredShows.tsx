import React from "react";
import type { TMDBShow, Preference } from "typings";
import { useReadLocalStorage } from "usehooks-ts";
import { useReasons } from "~/hooks/useReasons";
import ChooseReasons from "./ChooseReasons";
import ShowCardLarge from "./ShowCardLarge";

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
        <div key={show.id} className="flex flex-col space-y-4">
          <ShowCardLarge show={show} />
          {isLoadingReasons ? (
            "Loading reasons..."
          ) : (
            <ChooseReasons
              title={show.title ?? show.name}
              reasons={reasons}
              setPreferences={setPreferences}
            />
          )}
        </div>
      ))}
    </>
  );
}

export default PreferredShows;
