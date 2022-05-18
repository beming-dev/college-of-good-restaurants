import React, { useState } from "react";
import type { NextPage } from "next";

type change = {
  (e: React.ChangeEvent<HTMLInputElement>): void;
};

const Signup: NextPage = () => {
  const [mailAddress, setMailAddress] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onMailAddressChange: change = (e) => {
    setMailAddress(e.target.value);
  };
  const onAuthCodeChange: change = (e) => {
    setAuthCode(e.target.value);
  };
  const onIdChange: change = (e) => {
    setId(e.target.value);
  };
  const onPwChange: change = (e) => {
    setPw(e.target.value);
  };

  return (
    <div className="signup">
      <span className="title">맛집대학 회원가입</span>
      <div className="mail-box box">
        <span>학교메일주소</span>
        <input type="text" onChange={onMailAddressChange} />
        <button>인증코드발송</button>
      </div>
      <div className="certificate-box box">
        <span>인증코드</span>
        <input type="text" onChange={onAuthCodeChange} />
        <button>인증코드확인</button>
      </div>
      <div className="id-box box">
        <span>아이디</span>
        <input type="text" onChange={onIdChange} />
        <button>중복확인</button>
      </div>
      <div className="pw-box box">
        <span>비밀번호</span>
        <input type="text" onChange={onPwChange} />
      </div>
      <button className="btn-signup">회원가입</button>
      <style jsx>{`
        .signup {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .title {
            font-size: 70px;
            color: #e8630a;
            margin-bottom: 50px;
          }
          .box {
            width: 450px;
            display: flex;
            margin: 20px 0;
            span {
              width: 120px;
            }
            input {
              width: 200px;
              height: 20px;
              border: 1px solid #e8630a;
              border-radius: 3px;
            }

            button {
              width: 100px;
              margin-left: 20px;
              border-radius: 3px;
              border: none;
              background: #c4c4c4;
            }
          }

          .btn-signup {
            width: 150px;
            height: 50px;
            background: white;
            border: 1px solid #e8630a;
            border-radius: 10px;
            margin-top: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;
