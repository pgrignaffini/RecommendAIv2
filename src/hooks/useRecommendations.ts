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
  services?: string[],
  mediaTypes?: string[]
) => {
  const fetchRecommendations = async () => {
    let mediaType = undefined;
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
    if (mediaTypes?.length == 1) mediaType = mediaTypes[0] as string;
    const filter = mediaType ? `?media_type=${mediaType}` : "";

    const preferencesParam: PreferenceParam[] = preferences.map((pref) => {
      const reasons = pref.reasons.join("");
      return { title: pref.title + " (movie)", reasons };
    });

    const res = await axios.post(`/api/recommendations/${filter}`, {
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
    cacheTime: 0,
    onError: (err) => {
      toast.error("Failed to fetch recommendations, please try again later.");
      console.error(err);
    },
  });

  const isLoadingRecommendations = isLoading || isFetching;

  return { recommendations, getRecommendations, isLoadingRecommendations };
};
