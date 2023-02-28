declare module "typings" {
  type Show = {
    imdbID: string;
    tmdbID: string;
    imdbRating: number;
    imdbVoteCount: number;
    tmdbRating: number;
    backdropPath: string;
    backdropURLs: {
      300: string;
      780: string;
      1280: string;
      original: string;
    };
    originalTitle: string;
    genres: string[];
    countries: string[];
    year: number;
    firstAirYear: number;
    lastAirYear: number;
    episodeRuntimes: number[];
    cast: string[];
    significants: string[];
    title: string;
    overview: string;
    video: string;
    posterPath: string;
    posterURLs: {
      92: string;
      154: string;
      185: string;
      342: string;
      500: string;
      780: string;
      original: string;
    };
    seasons: number;
    episodes: number;
    age: number;
    status: number;
    tagline: string;
    streamingInfo: object;
    originalLanguage: string;
    content_type: string;
    runtime: string;
  };
}
