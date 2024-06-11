import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import firebase from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errCode, setErrCode] = useState("");

  const navigate = useNavigate();

  const SignInFunc = async (e) => {
    e.preventDefault();
    if (!(email && password)) {
      return alert("빈칸을 입력해주세요");
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert("로그인되었습니다. 알림창을 닫으면 홈으로 이동합니다.");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrCode("해당 이메일은 가입되지 않은 이메일입니다");
      } else if (error.code === "auth/wrong-password") {
        setErrCode("비밀번호를 잘못 입력하셨습니다");
      } else {
        setErrCode("그밖의 에러타입");
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="content">
        <input
          className="input_email"
          type="email"
          value={email}
          placeholder="이메일을 입력하세요"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input_password"
          type="password"
          value={password}
          placeholder="패스워드를 입력하세요"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errCode.length > 0 ? <p>{errCode}</p> : null}
        <button onClick={(e) => SignInFunc(e)} className="login_btn">
          로그인
        </button>
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
