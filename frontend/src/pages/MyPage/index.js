import React from "react";
import Row from "./../../components/Row";
import requests from "./../../api/requests";

function MyPage() {
  return (
    <div>
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
    </div>
  );
}

export default MyPage;
