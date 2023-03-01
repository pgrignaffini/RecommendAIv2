import axios from "axios";
import React from "react";
import type { Show, TMDBShow, Preference } from "typings";
import { useReadLocalStorage } from "usehooks-ts";
import ChooseReasons from "~/components/ChooseReasons";
import RecommendationCard from "~/components/RecommendationCard";
import ShowCard from "~/components/ShowCard";
import { useReasons } from "~/hooks/useReasons";
import { useRecommendations } from "~/hooks/useRecommendations";

function Reasons() {
  const preferredShows = useReadLocalStorage<TMDBShow[]>("shows");
  const { reasons, isLoadingReasons } = useReasons(
    preferredShows as TMDBShow[]
  );
  const [preferences, setPreferences] = React.useState<Preference[]>([]);
  const { recommendations, getRecommendations, isLoadingRecommendations } =
    useRecommendations(preferences);

  return (
    <div className="flex flex-col space-y-8">
      <div className="mt-12 flex w-full justify-center space-x-4">
        {preferredShows?.map((show) => (
          <div key={show.id} className="flex flex-col space-y-4">
            <ShowCard show={show} isLarge />
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
      </div>
      {preferences?.length === preferredShows?.length && (
        <button
          className="mx-auto w-fit rounded-full border-2 bg-[#072942] p-3 text-center text-lg text-white"
          onClick={() => getRecommendations()}
        >
          Recommendations {isLoadingRecommendations && " loading..."}
        </button>
      )}
      <div className="grid grid-cols-4 gap-4">
        {recommendations?.map((show: Show) => (
          <RecommendationCard key={show.imdbID} show={show} />
        ))}
      </div>
    </div>
  );
}

export default Reasons;
