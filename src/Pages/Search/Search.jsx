import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

import "./Search.css";
import { Card, Loader, Pagination, Tab } from "../../components";

const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [mediaType, setmediaType] = useState("movie");
  const [searchQuery, setSearchQuery] = useState("batman");
  const searchRef = useRef(null);

  async function fetchDatas() {
    try {
      setError(false);
      setLoading(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${mediaType}?api_key=${apiKey}&query=${searchQuery}&language=en-Us&page=${page}`
      );
      setDatas(data.results);
      setTotalPage(data.total_pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  function handleTab(currentTab) {
    switch (currentTab) {
      case "Search Movies":
        setmediaType("movie");
        setPage(1);
        break;
      case "Search TV Series":
        setmediaType("tv");
        setPage(1);
        break;
      default:
        setmediaType("movie");
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    setSearchQuery(searchRef.current.value);
    setPage(1);
  }

  useEffect(() => {
    fetchDatas();
  }, [page, mediaType, searchQuery]);

  return (
    <div className="search">
      <div className="search__header">
        <Tab
          item1="Search Movies"
          item2="Search TV Series"
          handleTab={handleTab}
        />
        <form className="search__input-container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            className="search__input"
            ref={searchRef}
          />
          <IoSearch
            className="search__icon"
            type="submit"
            onClick={handleSearch}
          />
        </form>
      </div>

      {loading && <Loader />}
      {(error || datas.length === 0) && !loading && (
        <p className="error--msg">
          {mediaType === "movie" ? "Movies" : "TV Series"} Not Found!
        </p>
      )}
      {!loading && !error && (
        <div className="card__conatiner">
          {datas.map((data) => {
            return (
              <Card
                key={data.id}
                id={data.id}
                poster_path={data.poster_path}
                title={mediaType === "tv" ? data.name : data.title}
                media_type={mediaType}
                release_date={
                  mediaType === "tv" ? data.first_air_date : data.release_date
                }
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

export default Search;
