import React from "react";
import type { Preference, Recommendation } from "typings";
import RecommendationCard from "~/components/RecommendationCard";
import Spinner from "~/components/Spinner";
import { useRecommendations } from "~/hooks/useRecommendations";
import dynamic from "next/dynamic";
import { defaultGenres, defaultServices } from "~/utils/constants";
import toast from "react-hot-toast";

const PreferredShows = dynamic(() => import("~/components/PreferredShows"), {
  ssr: false,
});

function Reasons() {
  const [ignore, setIgnore] = React.useState<string[]>([]);
  const [preferences, setPreferences] = React.useState<Preference[]>([]);
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);
  const [selectedServices, setSelectedServices] =
    React.useState<string[]>(defaultServices);
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
      <div className="mx-auto space-y-4 xl:w-2/3">
        <PreferredShows setPreferences={setPreferences} />
      </div>
      <div className="mx-auto flex w-full grid-cols-2 flex-col gap-10 px-2 xl:grid xl:px-12">
        <div className="col-span-1">
          <h2 className="mb-2 text-lg text-white">Select up to 5 genres:</h2>
          <div className="grid grid-cols-2 gap-2  md:grid-cols-4 xl:grid-cols-7">
            {defaultGenres.map((genre) => (
              <button
                key={genre}
                className={`btn ${
                  selectedGenres.includes(genre) ? "" : "btn-outline"
                } btn-success`}
                onClick={() => handleGenreClick(genre)}
              >
                {genre} {selectedGenres.includes(genre) && " ✔"}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <h2 className="mb-2 text-lg text-white ">
            Select at least 3 services:
          </h2>
          <div className="grid grid-cols-2 gap-2  md:grid-cols-4 xl:grid-cols-3">
            {defaultServices.map((service) => (
              <button
                key={service}
                onClick={() => handleServiceClick(service)}
                className={`btn ${
                  selectedServices.includes(service) ? "" : "btn-outline"
                } btn-info`}
              >
                {service} {selectedServices.includes(service) && " ✔"}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        id="recommendations"
        className="flex flex-col space-y-4 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4"
      >
        {recommendations?.map((recommendation: Recommendation) => (
          <RecommendationCard
            key={recommendation.streaming_data.imdbID}
            recommendation={recommendation}
          />
        ))}
      </div>

      <button
        className="btn-primary btn mx-auto"
        disabled={selectedServices.length < 3 || isLoadingRecommendations}
        onClick={() => {
          if (selectedGenres.length <= 5 && selectedServices.length >= 3) {
            getRecommendations()
              .then(() => {
                scrollToRecommendations();
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            toast.error(
              "Please select at least 3 services and up to 5 genres."
            );
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
