import axios from "axios";
import "./MediaDetail.css";
import { useEffect, useState } from "react";
import { Loader } from "../../components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaYoutube } from "react-icons/fa";
import { useParams } from "react-router-dom";

import {
  backdropPlaceholder,
  backdropPathPrefix,
  youtubePrefix,
  profilePlaceholder,
  profilePathPrefix,
} from "../../utils/config";
import { NotFound } from "../";

const apiKey = import.meta.env.VITE_API_KEY;

const initialData = {
  backdrop_path: "",
  title: "",
  genres: [],
  overview: "",
  watch: {},
  cast: [],
};
const MediaDetail = () => {
  const { media, id } = useParams();
  const [mediaType] = useState(media);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [imageLoad, setimageLoad] = useState();

  async function fetchDetailData() {
    try {
      setError(null);
      setLoading(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos,credits`
      );

      setData({
        backdrop_path: data.backdrop_path,
        title: mediaType === "movie" ? data.title : data.name,
        genres: data.genres,
        overview: data.overview,
        watch: data.videos.length > 0 && data.videos.results[0],
        cast: data.credits.cast,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Not Found!");
    }
  }

  useEffect(() => {
    fetchDetailData();
  }, []);
  return (
    <>
      {loading && <Loader />}
      {error && <NotFound />}
      {!loading && !error && (
        <div className="media">
          <div
            className={`media__image-container ${
              imageLoad && "media--image-load"
            }`}
          >
            <LazyLoadImage
              height={450}
              src={
                data.backdrop_path
                  ? `${backdropPathPrefix}${data.backdrop_path}`
                  : backdropPlaceholder
              }
              alt={data.title}
              effect="blur"
              delayTime={100}
              delayMethod="throttle"
              useIntersectionObserver={true}
              beforeLoad={() => setimageLoad(true)}
              afterLoad={() => setimageLoad(false)}
            />
          </div>
          <div className="media__header">
            <h1 className="media__title">{data.title}</h1>
            <div className="media__genres">
              {data.genres.map((genre) => {
                return (
                  <span className="media__genres-item" key={genre.id}>
                    #{genre.name}
                  </span>
                );
              })}
            </div>
          </div>
          <p className="media__text">{data.overview}</p>
          {data.watch && (
            <div className="media__link">
              <FaYoutube />
              <a href={`${youtubePrefix}${data.watch.key}`} target="_blank">
                Watch {data.watch.type}
              </a>
            </div>
          )}
          <h2 className="media__casts-title">Movie Casts</h2>
          <div className="media__casts">
            {data.cast.map((person) => {
              return (
                <div className="media__casts-item" key={person.id}>
                  <img
                    src={
                      person.profile_path
                        ? `${profilePathPrefix}${person.profile_path}`
                        : profilePlaceholder
                    }
                    alt={person.name}
                  />
                  <p className="media__cast-name">{person.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MediaDetail;
