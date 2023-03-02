import axios from "axios";
import { useQuery } from "react-query";
import type { Preference, Recommendation } from "typings";

interface RecommendationsResponse {
  recommendations: Recommendation[];
}

export const useRecommendations = (
  preferences: Preference[],
  ignore: string[],
  genres?: string[],
  services?: string[]
) => {
  const fetchRecommendations = async () => {
    if (!genres?.length)
      genres = ["Drama", "Action", "Science Fiction", "Mystery", "Thriller"];
    if (!services?.length)
      services = [
        "netflix",
        "prime",
        "disney",
        "hbo",
        "hulu",
        "peacock",
        "apple",
      ];

    const res = await axios.post("/api/recommendations", {
      preferences,
      genres,
      services,
      ignore,
    });

    return (res?.data as RecommendationsResponse)?.recommendations ?? [];
  };

  const {
    data: recommendations,
    refetch: getRecommendations,
    isLoading,
    isFetching,
  } = useQuery("recommendations", fetchRecommendations, {
    enabled: false,
    keepPreviousData: true,
  });

  const isLoadingRecommendations = isLoading || isFetching;

  return { recommendations, getRecommendations, isLoadingRecommendations };
};
