import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import type { MoviesResponse } from "../types/movie";

const API_BASE_URL = "https://api.themoviedb.org/3";

// беремо токен саме з VITE_TMDB_TOKEN
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

export interface FetchMoviesParams {
  query: string;
  page: number;
}

export const fetchMovies = async (
  params: FetchMoviesParams
): Promise<MoviesResponse> => {
  const config: AxiosRequestConfig = {
    params: {
      // можна додати будь-які дефолтні параметри TMDB
      include_adult: false,
      language: "en-US",
      ...params,
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: "application/json",
    },
  };

  const response: AxiosResponse<MoviesResponse> =
    await axios.get<MoviesResponse>(`${API_BASE_URL}/search/movie`, config);

  return response.data;
};
