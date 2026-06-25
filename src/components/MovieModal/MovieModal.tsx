import { createPortal } from "react-dom";
import { useEffect } from "react";
import styles from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { backdropUrl } from "../../services/movieService";

interface Props {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

export default function MovieModal({ movie, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <img
          className={styles.image}
          src={backdropUrl(movie.backdrop_path)}
          alt={movie.title}
        />

        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>{movie.release_date}</p>
          <p>{movie.vote_average}/10</p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}