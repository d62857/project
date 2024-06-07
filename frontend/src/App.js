import { Outlet, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import DetailPage from "./pages/DetailPage/index";
import MainPage from "./pages/MainPage/index";
import SearchPage from "./pages/SearchPage/index";
import MyPage from "./pages/MyPage/index";
import Login from "./pages/UserPage/Login";
import Register from "./pages/UserPage/Register";

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
          <Route exact path="/" element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
