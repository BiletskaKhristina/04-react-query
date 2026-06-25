import axios from "axios";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

const IMG = "https://image.tmdb.org/t/p";

interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  const { data } = await api.get<MovieResponse>("/search/movie", {
    params: { query, page },
  });

  return data;
};

export const posterUrl = (path: string) =>
  path ? `${IMG}/w500${path}` : "";

export const backdropUrl = (path: string) =>
  path ? `${IMG}/original${path}` : "";