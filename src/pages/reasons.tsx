import React, { useState } from "react";
import type {
  Preference,
  ProgressResponse,
  Recommendation,
  HashResponse,
  RecommendationsResponse,
} from "typings";
import RecommendationCard from "~/components/RecommendationCard";
import Spinner from "~/components/Spinner";
import {
  runRecommendations,
  checkProgress,
  getRecommendations,
} from "~/utils/requests";
import dynamic from "next/dynamic";
import {
  defaultGenres,
  defaultServices,
  defaultMediaTypes,
} from "~/utils/constants";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const PreferredShows = dynamic(() => import("~/components/PreferredShows"), {
  ssr: false,
});

function Reasons() {
  const [ignore, setIgnore] = React.useState<string[]>([]);
  const [preferences, setPreferences] = React.useState<Preference[]>([]);
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);
  const [selectedServices, setSelectedServices] =
    React.useState<string[]>(defaultServices);
  const [selectedMediaTypes, setSelectedMediaTypes] =
    React.useState<string[]>(defaultMediaTypes);
  const [infoHash, setInfoHash] = useState<HashResponse | undefined>(undefined);
  const [progressData, setProgressData] = useState<
    ProgressResponse | undefined
  >(undefined);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const isLoadingRecommendations =
    progressData && progressData?.progress >= 0 && progressData?.progress < 1;

  useQuery("progress", () => checkProgress(infoHash?.info_hash), {
    enabled: !!infoHash,
    refetchInterval: 5000,
    onSuccess: (data) => {
      setProgressData(data);
    },
  });

  useQuery("recommendations", () => getRecommendations(infoHash), {
    enabled: !!infoHash && !!progressData && progressData?.progress > 0,
    onSuccess: (data: RecommendationsResponse) => {
      setRecommendations(data?.recommendations);
      if ((progressData?.progress as number) >= 1) {
        setInfoHash(undefined);
        setProgressData(undefined);
      }

      setIgnore(
        data?.recommendations.map((recommendation) => recommendation?.title) ??
          []
      );
    },
  });

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

  const handleMediaTypeClick = (mediaType: string) => {
    if (selectedMediaTypes.includes(mediaType)) {
      setSelectedMediaTypes(
        selectedMediaTypes.filter(
          (selectedMediaType) => selectedMediaType !== mediaType
        )
      );
    } else {
      setSelectedMediaTypes([...selectedMediaTypes, mediaType]);
    }
  };

  return (
    <div className="flex flex-col space-y-8 p-4">
      <div className="mx-auto space-y-4 xl:w-2/3">
        <PreferredShows setPreferences={setPreferences} />
      </div>
      <div className="mx-auto flex w-full grid-cols-7 flex-col gap-10 px-2 xl:grid xl:px-12">
        <div className="col-span-4">
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
        <div className="col-span-2">
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
        <div className="col-span-1">
          <h2 className="mb-2 text-lg text-white ">
            Select type of recommendation:
          </h2>
          <div className="flex flex-col space-y-4">
            {defaultMediaTypes.map((mediaType) => (
              <button
                key={mediaType}
                onClick={() => handleMediaTypeClick(mediaType)}
                className={`btn ${
                  selectedMediaTypes.includes(mediaType) ? "" : "btn-outline"
                } btn-warning`}
              >
                {mediaType} {selectedMediaTypes.includes(mediaType) && " ✔"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        className="btn-primary btn mx-auto"
        disabled={selectedServices.length < 3}
        onClick={() => {
          if (selectedGenres.length <= 5 && selectedServices.length >= 3) {
            runRecommendations({
              preferences,
              ignore,
              genres: selectedGenres,
              services: selectedServices,
              mediaTypes: selectedMediaTypes,
            })
              .then((infoHash: HashResponse) => {
                setInfoHash(infoHash);
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
        Load{isLoadingRecommendations && "ing"} recommendations{" "}
        {isLoadingRecommendations && <Spinner />}
      </button>
      <progress
        className="progress progress-secondary mx-auto w-56"
        value={progressData?.progress ?? 0}
        max="1"
      ></progress>

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
    </div>
  );
}

export default Reasons;
