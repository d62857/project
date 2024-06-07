import React, { useState, useEffect, useRef } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useOnclickOutside from "./../hooks/useOnclickOutside";
import firebase from "../firebase";

export default function Nav() {
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const Menus = [
    "SF",
    "Family",
    "Horror",
    "Documentary",
    "Drama",
    "Romance",
    "Adventure",
    "Mystery",
    "Crime",
    "Western",
    "Thriller",
    "Animation",
    "Action",
    "History",
    "Music",
    "War",
    "Comedy",
    "Fantasy",
  ];

  const handleMyMovie = () => {
    if (user.accessToken) {
      setOpen(false);
      navigate("/mypage");
    } else {
      alert("로그인이 필요한 서비스입니다");
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setOpen(false);
    navigate(`/search?q=${e.target.value}`);
  };

  const handleLog = (e) => {
    e.preventDefault();
    if (user.accessToken) {
      firebase.auth().signOut();
      alert("로그아웃되었습니다. 알림창을 닫으면 홈으로 이동합니다.");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const menuRef = useRef();
  const btnRef = useRef();

  useOnclickOutside(menuRef, () => {
    setOpen(false);
  });

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/220px-Netflix_2015_logo.svg.png"
        className="nav__logo"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      />
      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화를 검색하세요"
      />
      <div className="h-screen bg-gray-200 felx justify-center">
        <div className="relative">
          <button
            ref={btnRef}
            onClick={() => setOpen(!open)}
            className="nav__genre"
          >
            장르별 찾기
            {open && (
              <div ref={menuRef} className="nav__menu">
                <ul>
                  {Menus.map((menu) => (
                    <li
                      onClick={() => setOpen(false)}
                      className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100"
                      key={menu}
                    >
                      {menu}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>
        </div>
      </div>
      <button
        className="nav__my"
        onClick={(e) => {
          e.preventDefault();
          handleMyMovie();
        }}
      >
        나의 영화
      </button>
      <button
        className="nav__log"
        onClick={(e) => {
          handleLog(e);
        }}
      >
        {user.accessToken ? "로그아웃" : "로그인"}
      </button>
      <button
        className="nav__regi"
        onClick={(e) => {
          e.preventDefault();
          navigate("/register");
        }}
      >
        회원가입
      </button>
    </nav>
  );
}
