import React, { useEffect, useState } from "react";
import Banner from "./../../components/Banner";
import Row from "./../../components/Row";
import requests from "./../../api/requests";
import axios from "axios";
import { useSelector } from "react-redux";

export default function MainPage() {
  const [movieList, setMovieList] = useState([]);
  const user = useSelector((state) => state.user);
  const [recommendList, setRecommendList] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (user.accessToken) {
      if (user.ratings !== null) {
        fetchRecommendation(2);
        setFlag(true);
      }
    }
  }, [user.ratings]);

  const fetchRecommendation = async (mode) => {
    try {
      console.log("함수 시작");
      const response = await axios.post(
        "/project/api/recommendation/customized",
        {
          mode: "user",
          uid: user.uid,
        }
      );

      const temp = response.data;
      setRecommendList(temp);
      for (const tmdbId of recommendList) {
        const details = await axios.get(
          `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setMovieList((prev) => [...prev, details.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Banner />
      {flag ? (
        <Row // 로그인한 유저가 평가데이터까지 가지고있을 경우
          title="맞춤 추천작품"
          id="UR"
          recommended={movieList}
          isLargeRow
        />
      ) : (
        <Row // 로그인하지 않았거나 평가데이터가 없는 경우
          title="최근 인기작"
          id="TR"
          fetchUrl={requests.fetchTrending}
          isLargeRow
        />
      )}

      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
    </div>
  );
}
