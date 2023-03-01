import axios from "axios";
import { useQuery } from "react-query";
import type { TMDBConfiguration } from "typings";

export const useConfig = () => {
  const fetchConfig = async () => {
    const res = await axios.get("/api/config").catch((err) => {
      console.log(err);
    });
    return res?.data as TMDBConfiguration;
  };

  const { data: config, isLoading: configLoading } = useQuery(
    "config",
    fetchConfig
  );

  const baseUrl = config?.images?.secure_base_url as string;
  const posterSizes = config?.images?.poster_sizes as string[];
  const backdropSizes = config?.images?.backdrop_sizes as string[];
  const logoSizes = config?.images?.logo_sizes as string[];

  return {
    config,
    configLoading,
    baseUrl,
    posterSizes,
    backdropSizes,
    logoSizes,
  };
};
