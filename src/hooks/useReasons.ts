import axios from "axios";
import type { TMDBShow, Reasons } from "typings";
import { useQuery } from "react-query";

export const useReasons = (shows: TMDBShow[]) => {
  const fetchReasons = async (shows: TMDBShow[]) => {
    const titles: string[] = shows?.map((show) => show.title ?? show.name);
    const reasons = await axios.post("/api/reasons", titles);
    return reasons.data as Reasons;
  };

  const {
    data: reasons,
    isLoading: isLoadingReasons,
    isError,
  } = useQuery("reasons", () => fetchReasons(shows), {
    enabled: !!shows,
  });

  return { reasons, isLoadingReasons, isError };
};
