import styles from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";
import { posterUrl } from "../../services/movieService";

interface Props {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: Props) {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div className={styles.card} onClick={() => onSelect(movie)}>
            <img
              className={styles.image}
              src={posterUrl(movie.poster_path)}
              alt={movie.title}
            />
            <h2 className={styles.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}