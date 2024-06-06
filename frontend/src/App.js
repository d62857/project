import { Outlet, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import DetailPage from "./pages/DetailPage/index";
import MainPage from "./pages/MainPage/index";
import SearchPage from "./pages/SearchPage/index";
import MyPage from "./pages/MyPage/index";

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />

      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
