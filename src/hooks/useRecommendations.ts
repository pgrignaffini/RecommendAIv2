import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import type { Preference, Recommendation } from "typings";

interface RecommendationsResponse {
  recommendations: Recommendation[];
}

interface PreferenceParam {
  title: string;
  reasons: string;
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

    const preferencesParam: PreferenceParam[] = preferences.map((pref) => {
      const reasons = pref.reasons.join("");
      return { title: pref.title + " (movie)", reasons };
    });

    const res = await axios.post("/api/recommendations", {
      preferences: preferencesParam,
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
    onError: (err) => {
      toast.error("Failed to fetch recommendations, please try again later.");
      console.error(err);
    },
  });

  const isLoadingRecommendations = isLoading || isFetching;

  return { recommendations, getRecommendations, isLoadingRecommendations };
};
