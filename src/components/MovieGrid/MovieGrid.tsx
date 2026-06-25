import styles from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";
import { posterUrl } from "../../services/movieService";

export interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={styles.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <div className={styles.card} onClick={() => onSelect(m)}>
            <img
              className={styles.image}
              src={posterUrl(m.poster_path)}
              alt={m.title}
            />
            <h2 className={styles.title}>{m.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}