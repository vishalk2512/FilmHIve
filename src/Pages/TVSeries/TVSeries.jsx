import axios from "axios";
import { useEffect, useState } from "react";

import "./TVSeries.css";

import { Card, Genre, Loader, Pagination } from "../../components";
import useGenre from "../../hooks/useGenre";

const apiKey = import.meta.env.VITE_API_KEY;

const TVSeries = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [genres, setGenres] = useState([]);
  const [activeGenres, setActiveGenres] = useState([]);
  const genreIds = useGenre(activeGenres);

  async function fetchTVSeries() {
    try {
      setError(false);
      setLoading(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreIds}`
      );
      setDatas(data.results);
      setTotalPage(data.total_pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    setPage(1);
  }, [genreIds]);

  useEffect(() => {
    fetchTVSeries();
  }, [page, genreIds]);
  return (
    <div>
      <div className="tvseries__header">
        <h1 className="tvseries__title">discover movies</h1>
        <Genre
          media_type="tv"
          genres={genres}
          setGenres={setGenres}
          activeGenres={activeGenres}
          setActiveGenres={setActiveGenres}
        />
      </div>

      {loading && <Loader />}
      {(error || datas.length === 0) && !loading && (
        <p className="error--msg">TV Series Not Found!</p>
      )}
      {!loading && !error && (
        <div className="card__conatiner">
          {datas.map((data) => {
            return (
              <Card
                key={data.id}
                id={data.id}
                poster_path={data.poster_path}
                title={data.name}
                media_type="tv"
                release_date={data.first_air_date}
                vote_average={data.vote_average}
                vote_count={data.vote_count}
              />
            );
          })}
        </div>
      )}
      {totalPage > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={totalPage}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

export default TVSeries;
