import React, { useRef } from "react";
import "./MovieModal.css";
import Rating from "../Rating";
import useOnclickOutside from "./../../hooks/useOnclickOutside";

function MovieModal({
  id,
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) {
  const ref = useRef();

  useOnclickOutside(ref, () => {
    setModalOpen(false);
  });

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span onClick={() => setModalOpen(false)} className="modal-close">
            x
          </span>

          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal__poster-img"
          />
          <div className="modal__content">
            <p className="modal__details">
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            <p className="modal__overview">{overview}</p>
            <p className="modal__ratingIs">이 영화를 본 나의 평점은..</p>
            <div className="modal__rating">
              <Rating id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
