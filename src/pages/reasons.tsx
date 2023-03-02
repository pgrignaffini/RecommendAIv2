import React from "react";
import type { Preference, Recommendation } from "typings";
import RecommendationCard from "~/components/RecommendationCard";
import Spinner from "~/components/Spinner";
import { useRecommendations } from "~/hooks/useRecommendations";
import dynamic from "next/dynamic";
import { defaultGenres, defaultServices } from "~/utils/constants";

const PreferredShows = dynamic(() => import("~/components/PreferredShows"), {
  ssr: false,
});

function Reasons() {
  const [ignore, setIgnore] = React.useState<string[]>([]);
  const [preferences, setPreferences] = React.useState<Preference[]>([]);
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
  const { recommendations, getRecommendations, isLoadingRecommendations } =
    useRecommendations(preferences, ignore, selectedGenres, selectedServices);

  React.useEffect(() => {
    setIgnore(
      recommendations?.map((recommendation) => recommendation?.title) ?? []
    );
  }, [recommendations]);

  const scrollToRecommendations = () => {
    const element = document.getElementById("recommendations");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGenreClick = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(
        selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
      );
    } else {
      if (selectedGenres.length < 5) {
        setSelectedGenres([...selectedGenres, genre]);
      }
    }
  };

  const handleServiceClick = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(
        selectedServices.filter(
          (selectedService) => selectedService !== service
        )
      );
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <div className="flex flex-col space-y-8 p-4">
      <div className="mt-12 flex w-full justify-center space-x-4">
        <PreferredShows setPreferences={setPreferences} />
      </div>
      <div className="mx-auto grid w-full grid-cols-2 gap-10 px-12">
        <div className="col-span-1">
          <h2>Select up to 5 genres:</h2>
          <div className="grid grid-cols-3 gap-2 md:grid-cols-5 xl:grid-cols-7">
            {defaultGenres.map((genre) => (
              <button
                key={genre}
                className={`btn ${
                  selectedGenres.includes(genre) ? "" : "btn-outline"
                } btn-success`}
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <h2>Select at least 3 services:</h2>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
            {defaultServices.map((service) => (
              <button
                key={service}
                onClick={() => handleServiceClick(service)}
                className={`btn ${
                  selectedServices.includes(service) ? "" : "btn-outline"
                } btn-info`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
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
          if (selectedGenres.length <= 5 && selectedServices.length >= 3) {
            getRecommendations()
              .then(() => {
                scrollToRecommendations();
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }}
      >
        Load{isLoadingRecommendations && "ing "} {recommendations && "new "}
        recommendations {isLoadingRecommendations && <Spinner />}
      </button>
    </div>
  );
}

export default Reasons;
