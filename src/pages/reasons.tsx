import React from "react";
import type { Preference, Recommendation } from "typings";
import RecommendationCard from "~/components/RecommendationCard";
import Spinner from "~/components/Spinner";
import { useRecommendations } from "~/hooks/useRecommendations";
import dynamic from "next/dynamic";

const PreferredShows = dynamic(() => import("~/components/PreferredShows"), {
  ssr: false,
});

function Reasons() {
  const [ignore, setIgnore] = React.useState<string[]>([]);
  const [preferences, setPreferences] = React.useState<Preference[]>([]);
  const { recommendations, getRecommendations, isLoadingRecommendations } =
    useRecommendations(preferences, ignore);

  React.useEffect(() => {
    setIgnore(
      recommendations?.map((recommendation) => recommendation?.title) ?? []
    );
  }, [recommendations]);

  console.log("ignore", ignore);

  const scrollToRecommendations = () => {
    const element = document.getElementById("recommendations");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col space-y-8 p-4">
      <div className="mt-12 flex w-full justify-center space-x-4">
        <PreferredShows setPreferences={setPreferences} />
      </div>
      <div
        id="recommendations"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {recommendations?.map((recommendation: Recommendation) => (
          <RecommendationCard
            key={recommendation.streaming_data.imdbID}
            recommendation={recommendation}
          />
        ))}
      </div>
      <button
        className="mx-auto flex w-fit items-center space-x-4 rounded-full border-2 bg-[#072942] p-3 text-center text-lg text-white"
        onClick={() => {
          getRecommendations()
            .then(() => {
              scrollToRecommendations();
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        Load{isLoadingRecommendations && "ing "} {recommendations && "new "}
        recommendations {isLoadingRecommendations && <Spinner />}
      </button>
    </div>
  );
}

export default Reasons;
