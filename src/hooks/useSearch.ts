import axios from "axios";
import { useQuery } from "react-query";
import type { TMDBShow } from "typings";

interface SearchResponse {
  page: number;
  results: Array<TMDBShow>;
  total_pages: number;
  total_results: number;
}

export const useSearch = (word: string) => {
  const searchShow = async () => {
    const res = await axios.get("/api/search", {
      params: {
        query: word,
      },
    });
    return (res.data as SearchResponse).results;
  };

  const {
    data: shows,
    isLoading,
    isFetching,
    refetch: search,
    remove: removeSearch,
  } = useQuery("search", searchShow, {
    enabled: false,
  });

  const isSearching = isLoading || isFetching;

  return { search, shows, removeSearch, isSearching };
};
