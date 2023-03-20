declare module "typings" {
  type StreamingService =
    | "netflix"
    | "prime"
    | "disney"
    | "hbo"
    | "hulu"
    | "peacock"
    | "starz"
    | "showtime"
    | "apple"
    | "mubi";

  type StreamingInfo = {
    [service in StreamingService]: {
      [country: string]: {
        link: string;
        added: number;
        leaving: number;
      };
    };
  };

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
    streamingInfo: StreamingInfo;
    originalLanguage: string;
    content_type: string;
    runtime: string;
  };

  type Recommendation = {
    explanation: string;
    streaming_data: Show;
    title: string;
  };

  type Reasons = {
    [title: string]: string[];
  };

  type Preference = {
    title: string;
    reasons: string[];
  };

  type TMDBShow = {
    adult: false;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    original_name: string;
    overview: string;
    poster_path: string;
    release_date: Date;
    title: string;
    name: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    popularity: number;
  };

  type TMDBResult = {
    page: number;
    results: TMDBShow[];
    total_pages: number;
    total_results: number;
  };

  type TMDBConfiguration = {
    images: {
      base_url: string;
      secure_base_url: string;
      backdrop_sizes: string[];
      logo_sizes: string[];
      poster_sizes: string[];
      profile_sizes: string[];
      still_sizes: string[];
    };
    change_keys: string[];
  };

  interface RecommendationsResponse {
    recommendations: Recommendation[];
  }

  interface HashResponse {
    info_hash: string;
  }

  interface ProgressResponse {
    progress: number;
  }

  interface PreferenceParam {
    title: string;
    reasons: string;
  }

  interface RequestProps {
    preferences: Preference[];
    ignore: string[];
    genres?: string[];
    services?: string[];
    mediaTypes?: string[];
  }
}
