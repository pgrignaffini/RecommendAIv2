import axios from "axios";
import { useQuery } from "react-query";
import type { Preference, Recommendation } from "typings";

export const useRecommendations = (
  preferences: Preference[],
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
    });

    return res?.data?.recommendations as Recommendation[];
  };

  const {
    data: recommendations,
    refetch: getRecommendations,
    isLoading: isLoadingRecommendations,
  } = useQuery("recommendations", fetchRecommendations, {
    enabled: false,
  });

  return { recommendations, getRecommendations, isLoadingRecommendations };
};
