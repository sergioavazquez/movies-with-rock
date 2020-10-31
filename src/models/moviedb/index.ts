export interface Movie {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: [number];
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

export interface MovieList {
  page: number;
  total_results: number;
  total_pages: number;
  results: [Movie];
}

export interface ApiConfig {
  change_keys: string[];
  images: {
    backdrop_sizes: string[];
    base_url: string;
    secure_base_url: string;
    logo_sizes: string[];
    profile_sizes: string[];
    poster_sizes: string[];
    still_sizes: string[];
  };
}
