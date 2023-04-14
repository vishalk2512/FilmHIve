import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import "./Card.css";
import { handleRatingIndicationColor } from "../../utils/helper";
import { posterPlaceholder, posterPathPrefix } from "../../utils/config";
import { Link } from "react-router-dom";

const Card = ({
  poster_path,
  title,
  media_type,
  release_date,
  vote_average,
  vote_count,
  id,
}) => {
  const [imageLoad, setimageLoad] = useState();
  return (
    <Link className="card" to={`/${media_type}/${id}`}>
      <div
        className={`card__image-container ${imageLoad && "card--image-load"}`}
      >
        <LazyLoadImage
          height={450}
          src={
            poster_path
              ? `${posterPathPrefix}${poster_path}`
              : posterPlaceholder
          }
          alt={title}
          effect="blur"
          delayTime={100}
          delayMethod="throttle"
          useIntersectionObserver={true}
          beforeLoad={() => setimageLoad(true)}
          afterLoad={() => setimageLoad(false)}
        />
      </div>
      <h2 className="card__title">{title}</h2>
      <div className="card__info">
        <p>{media_type}</p>
        <p>{release_date}</p>
      </div>
      {vote_count > 0 && (
        <span
          className="card__rating"
          style={{ background: handleRatingIndicationColor(vote_average) }}
        >
          {vote_average.toFixed(1)}
        </span>
      )}
    </Link>
  );
};

export default Card;
