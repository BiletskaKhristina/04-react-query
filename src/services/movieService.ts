import axios from "axios";
import { type MovieResponse } from "../types/movie";

const API_KEY = "74a2f143f7b027ba8d37f5c2a288d86d";
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  const { data } = await axios.get<MovieResponse>(BASE_URL, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });

  return data;
};