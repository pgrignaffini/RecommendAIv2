import React from "react";
import type { TMDBShow, Preference, Recommendation } from "typings";
import { useReadLocalStorage } from "usehooks-ts";
import ChooseReasons from "~/components/ChooseReasons";
import RecommendationCard from "~/components/RecommendationCard";
import ShowCard from "~/components/ShowCard";
import Spinner from "~/components/Spinner";
import { useReasons } from "~/hooks/useReasons";
import { useRecommendations } from "~/hooks/useRecommendations";

function Reasons() {
  const [ignore, setIgnore] = React.useState<string[]>([]);
  const preferredShows = useReadLocalStorage<TMDBShow[]>("shows");
  const { reasons, isLoadingReasons } = useReasons(
    preferredShows as TMDBShow[]
  );
  const [preferences, setPreferences] = React.useState<Preference[]>([]);
  const { recommendations, getRecommendations, isLoadingRecommendations } =
    useRecommendations(preferences, ignore);

  React.useEffect(() => {
    setIgnore(
      recommendations?.map((recommendation) => recommendation?.title) ?? []
    );
  }, [recommendations]);

  console.log("ignore", ignore);

  return (
    <div className="flex flex-col space-y-8 p-4">
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {recommendations?.map((recommendation: Recommendation) => (
          <RecommendationCard
            key={recommendation.streaming_data.imdbID}
            recommendation={recommendation}
          />
        ))}
      </div>
      {preferences?.length === preferredShows?.length && (
        <button
          className="mx-auto flex w-fit items-center rounded-full border-2 bg-[#072942] p-3 text-center text-lg text-white"
          onClick={() => {
            getRecommendations().catch((err) => {
              console.error(err);
            });
          }}
        >
          Load{isLoadingRecommendations && "ing "} {recommendations && "more "}
          recommendations {isLoadingRecommendations && <Spinner />}
        </button>
      )}
    </div>
  );
}

export default Reasons;
