import type {
  RequestProps,
  PreferenceParam,
  HashResponse,
  ProgressResponse,
  RecommendationsResponse,
} from "typings";
import axios from "axios";
import toast from "react-hot-toast";

export const runRecommendations = async ({
  preferences,
  ignore,
  genres,
  services,
  mediaTypes,
}: RequestProps) => {
  let mediaType = undefined;
  if (!genres?.length) genres = [];
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

  // convert to string if only one media type is selected
  if (mediaTypes?.length == 1) mediaType = mediaTypes[0] as string;

  const preferencesParam: PreferenceParam[] = preferences.map((pref) => {
    const reasons = pref.reasons.join("");
    return { title: pref.title + " (movie)", reasons };
  });

  const filter = mediaType ?? "all";

  const res = await axios
    .post("/api/run-recommendations", {
      media_type: filter,
      preferences: preferencesParam,
      num_recommendations: 5,
      genres,
      services,
      ignore,
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error fetching recommendations");
    });

  console.log("Res", res?.data);

  return res?.data as HashResponse;
};

export const checkProgress = async (info_hash: string | undefined) => {
  console.log("info_hash", info_hash);
  const res = await axios
    .get("/api/check-progress", {
      params: { info_hash },
    })
    .catch((err) => {
      console.log(err);
    });

  return res?.data as ProgressResponse;
};

export const getRecommendations = async (
  infoHash: HashResponse | undefined
) => {
  const res = await axios
    .get("/api/get-recommendations", {
      params: {
        info_hash: infoHash?.info_hash,
      },
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error fetching recommendations");
    });

  return res?.data as RecommendationsResponse;
};
