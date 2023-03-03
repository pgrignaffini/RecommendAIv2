import axios from "axios";
import type { TMDBShow, Reasons } from "typings";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

export const useReasons = (shows: TMDBShow[]) => {
  const fetchReasons = async (shows: TMDBShow[]) => {
    const titles: string[] = shows?.map((show) => {
      return (
        show.title ||
        show.name ||
        show.original_name ||
        show.original_title + " movie"
      );
    });
    const reasons = await axios.post("/api/reasons", titles);
    return reasons.data as Reasons;
  };

  const {
    data: reasons,
    isLoading: isLoadingReasons,
    isError,
  } = useQuery("reasons", () => fetchReasons(shows), {
    enabled: !!shows,
    onError: (err) => {
      toast.error("Failed to fetch reasons, please try again later.");
      console.error(err);
    },
  });

  return { reasons, isLoadingReasons, isError };
};
