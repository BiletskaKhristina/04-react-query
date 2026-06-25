import axios from "axios";
import type { MovieResponse } from "../types/movie";

const API_KEY = "74a2f143f7b027ba8d37f5c2a288d86d";
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

const IMG = "https://image.tmdb.org/t/p";

export const fetchMovies = async (query: string, page: number): Promise<MovieResponse> => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });

  return data;
};

export const posterUrl = (path: string) =>
  path ? `${IMG}/w500${path}` : "";

export const backdropUrl = (path: string) =>
  path ? `${IMG}/original${path}` : "";