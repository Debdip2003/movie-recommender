import { useEffect, useRef, useState } from "react";
import StarRating from "..//components/StarRating";
import { Loader } from "./Loader";
import { useKey } from "../hooks/useKey";

const KEY = "4b320867";

export function MovieDetails({
  selectedId,
  handleCloseMovie,
  handleWatchedMovies,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);

  //useRef is immutable so we need to use a useEffect so that we can chnage the value of the ref

  useEffect(
    function () {
      if (userRating) {
        countRef.current = countRef.current + 1;
      }
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);
  const watcheduserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  function handleAdd() {
    const newWatchedMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecision: countRef.current,
    };

    handleWatchedMovies(newWatchedMovie);
    handleCloseMovie();
  }

  useKey("Escape", handleCloseMovie);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    //cleanup function

    return function () {
      document.title = "usePopcorn";
    };
  }, [title]); // to change the title of the browser when a movie is selected

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster for ${title}`} />
            <div className="details-overview">
              <h2>
                {title} {year}
              </h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐ {imdbRating} IMDB Rating</span>
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={22}
                    onRate={(rating) => {
                      setUserRating(rating);
                    }}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watcheduserRating} 🌟</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
              <p>
                Starring <em>{actors}</em>
              </p>
              <p>
                Directed by <em>{director}</em>
              </p>
            </p>
          </section>
        </>
      )}
    </div>
  );
}
