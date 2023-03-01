import axios from "axios";
import type { TMDBShow } from "typings";
import { useQuery } from "react-query";

export const useReasons = (shows: TMDBShow[]) => {
  const fetchReasons = async (shows: TMDBShow[]) => {
    const titles: string[] = shows?.map((show) => show.title ?? show.name);
    const reasons = await axios.post("/api/reasons", titles);
    return reasons.data as Map<string, string[]>;
  };

  const {
    data: reasons,
    isLoading,
    isError,
  } = useQuery("reasons", () => fetchReasons(shows), {
    enabled: !!shows,
  });

  return { reasons, isLoading, isError };
};
