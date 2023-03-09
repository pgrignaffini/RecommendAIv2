import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React from "react";
import { toast } from "react-hot-toast";
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
  const { reasons, isLoadingReasons, refetchReasons } = useReasons(
    preferredShows as TMDBShow[]
  );

  React.useEffect(() => {
    refetchReasons().catch((error) => {
      console.error(error);
      toast.error("Something went wrong retrieving reasons.");
    });
  }, [preferredShows, refetchReasons]);

  return (
    <>
      {preferredShows?.map((show) => (
        <div key={show.id} className="card bg-base-100 shadow-xl md:card-side">
          <ShowCardLarge show={show} />
          <div className="card-body">
            <div className="flex items-center">
              <h2 className="card-title w-full text-xl">
                {show.title ?? show.name}
              </h2>
              <div className="tooltip" data-tip="Refetch reasons">
                <button
                  className="btn"
                  onClick={() => {
                    refetchReasons().catch((error) => {
                      console.error(error);
                      toast.error("Something went wrong retrieving reasons.");
                    });
                  }}
                >
                  <ArrowPathIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
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
