import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import firebase from "../../firebase";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();

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
    const createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await createdUser.user.updateProfile({
      displayName: name,
    });
    const body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    };
    axios
      .post("/project/api/user/register", body)
      .then((response) => {
        setFlag(false);
        if (response.data.success) {
          navigate("/");
          alert("회원가입이 완료되었습니다");
        } else {
          alert("이미 가입된 이메일입니다");
        }
      })
      .catch((error) => {
        console.error("회원가입중 오류가 발생했습니다:", error);
      });
  };

  return (
    <div className="wrapper">
      <div className="content">
        <input
          className="input_name"
          type="name"
          value={name}
          placeholder="닉네임을 입력하세요"
          onChange={(e) => setName(e.target.value)}
        />
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
        <div className="guide_text">패스워드를 한번 더 입력하세요</div>
        <input
          className="input_password"
          type="password"
          value={confirmPW}
          placeholder="패스워드를 입력하세요"
          onChange={(e) => setConfirmPW(e.target.value)}
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
