import React, { useState } from "react";
import axios from "axios";
import "./Rating.css";
import { useSelector } from "react-redux";

function Rating({ id }) {
  const user = useSelector((state) => state.user);

  const [flag, setFlag] = useState(false);
  const menu = ["1점", "2점", "3점", "4점", "5점"];

  const handleRating = (x) => {
    if (user.accessToken && !flag) {
      setFlag(true);
      const body = {
        uid: user.uid,
        tmdbId: id,
        rating: x,
      };
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
          onClick={(e) => {
            e.preventDefault();
            handleRating(index + 1);
          }}
        >
          {menu}
        </button>
      ))}
    </div>
  );
}

export default Rating;
