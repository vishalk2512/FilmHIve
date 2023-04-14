import { useEffect, useState } from "react";
import axios from "axios";

import "./Genre.css";

const apiKey = import.meta.env.VITE_API_KEY;

const Genre = ({
  media_type,
  genres,
  setGenres,
  activeGenres,
  setActiveGenres,
}) => {
  const [loading, setLoading] = useState(null);
  async function fetchGenre() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${media_type}/list?api_key=${apiKey}&language=en-US`
      );
      setGenres(data.genres);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGenre();
  }, []);

  function addToActiveGenres(genre) {
    setGenres(genres.filter((currGenre) => currGenre.id !== genre.id));
    setActiveGenres([...activeGenres, genre]);
  }

  function removeFromActiveGenres(activeGenre) {
    setActiveGenres(
      activeGenres.filter((currGenre) => currGenre.id !== activeGenre.id)
    );
    setGenres([...genres, activeGenre]);
  }

  return (
    <>
      {loading ? (
        <span className="genres--loading">Genre Loading...</span>
      ) : (
        <div className="genres">
          {activeGenres.map((activeGenre) => (
            <span
              className="genres__label active"
              key={activeGenre.id}
              onClick={() => removeFromActiveGenres(activeGenre)}
            >
              {activeGenre.name}
            </span>
          ))}

          {genres.map((genre) => (
            <span
              className="genres__label"
              key={genre.id}
              onClick={() => addToActiveGenres(genre)}
            >
              {genre.name}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Genre;
