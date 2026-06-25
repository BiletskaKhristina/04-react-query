import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../services/movieService";
import css from "./App.module.css";
import { type Movie } from "../../types/movie";

import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
  });

  const movies: Movie[] = data?.results || [];
  const totalPages = data?.total_pages || 0;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("query") as HTMLInputElement;
    setQuery(input.value);
    setPage(1);
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input name="query" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error...</p>}

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
    </div>
  );
}