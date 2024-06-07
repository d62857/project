import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import firebase from "../../firebase";
import axios from "../../api/axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [flag, setFlag] = useState(false);

  let navigate = useNavigate();

  const RegisterFunc = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(name && email && password && confirmPW)) {
      return alert("빈칸을 입력해주세요");
    }
    if (password.length < 6) {
      return alert("비밀번호는 6자 이상으로 입력해주세요");
    }
    if (password !== confirmPW) {
      return alert("입력하신 두 비밀번호가 일치하지 않습니다");
    }
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await createdUser.user.updateProfile({
      displayName: name,
    });
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    };
    console.log("1");
    axios.post("/api/user/register", body).then((response) => {
      setFlag(false);
      if (response.data.success) {
        navigate("/login");
        alert("회원가입이 완료되었습니다. 로그인하시기 바랍니다.");
      } else {
        alert("이미 가입된 이메일입니다.");
      }
    });
    console.log("2");
  };

  return (
    <div className="wrapper">
      <div className="content">
        <input
          className="input_name"
          type="name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="이름을 입력하세요"
        />
        <input
          className="input_email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="이메일을 입력하세요"
        />
        <input
          className="input_password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="패스워드를 입력하세요"
        />
        <div className="guide_text">패스워드를 한번 더 입력하세요</div>
        <input
          className="input_password"
          type="password"
          value={confirmPW}
          onChange={(e) => setConfirmPW(e.currentTarget.value)}
          placeholder="패스워드를 입력하세요"
        />
        <button
          disabled={flag}
          onClick={(e) => {
            RegisterFunc(e);
          }}
          className="login_btn"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Register;
