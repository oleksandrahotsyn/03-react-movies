import type { KeyboardEvent } from "react";
import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (movies.length === 0) {
    return null;
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    movie: Movie
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      onSelect(movie);
    }
  };

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div
            className={css.card}
            onClick={() => onSelect(movie)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => handleKeyDown(event, movie)}
          >
            <img
              className={css.image}
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+image"
              }
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieGrid;
