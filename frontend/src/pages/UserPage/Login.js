import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="content">
        <input
          className="input_email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.currentTarget.value)}
          placeholder="이메일을 입력하세요"
        />
        <input
          className="input_password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.currentTarget.value)}
          placeholder="패스워드를 입력하세요"
        />
        <button className="login_btn">로그인</button>
        <button
          className="register_btn"
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          아이디가 없으신가요? 회원가입 하러가기
        </button>
      </div>
    </div>
  );
}

export default Login;
