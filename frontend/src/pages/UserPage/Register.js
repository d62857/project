import React, { useState } from "react";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  return (
    <div className="wrapper">
      <div className="content">
        <input
          className="input_name"
          type="name"
          onChange={(e) => setName(e.target.currentTarget.value)}
          placeholder="이름을 입력하세요"
        />
        <input
          className="input_email"
          type="email"
          name="value"
          onChange={(e) => setEmail(e.target.currentTarget.value)}
          placeholder="이메일을 입력하세요"
        />
        <input
          className="input_password"
          type="password"
          name="value"
          onChange={(e) => setPassword(e.target.currentTarget.value)}
          placeholder="패스워드를 입력하세요"
        />
        <div className="guide_text">패스워드를 한번 더 입력하세요</div>
        <input
          className="input_password"
          type="password"
          name="value"
          onChange={(e) => setConfirmPW(e.target.currentTarget.value)}
          placeholder="패스워드를 입력하세요"
        />
        <button className="login_btn">회원가입</button>
      </div>
    </div>
  );
}

export default Register;
