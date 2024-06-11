import React, { useState } from "react";
import axios from "axios";
import "./Rating.css";
import { useSelector } from "react-redux";

function Rating({ id }) {
  const user = useSelector((state) => state.user);
  const [ratingValue, setRatingValue] = useState(0);

  const [flag, setFlag] = useState(false);
  const menu = ["1점", "2점", "3점", "4점", "5점"];

  const body = {
    uid: user.uid,
    tmdbId: id,
    rating: ratingValue,
  };

  const handleRating = () => {
    console.log("실행");
    if (user.accessToken && !flag) {
      setFlag(true);
      console.log(typeof user.uid);
      axios
        .post("/project/api/rating/update", body)
        .then((response) => {
          alert("평점이 등록되었습니다");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("평점을 등록하시려면 로그인이 필요합니다");
    }
  };

  return (
    <div className="rating">
      {menu.map((menu, index) => (
        <button
          className="rating__btn"
          key={menu}
          onClick={() => {
            setRatingValue(index + 1);
            handleRating();
          }}
        >
          {menu}
        </button>
      ))}
    </div>
  );
}

export default Rating;
