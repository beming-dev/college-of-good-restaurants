import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SignIn = ({ signinDisplay, setSigninDisplay }) => {
  const onExitClick = () => {
    setSigninDisplay("none");
  };
  return (
    <div className="signin">
      <div className="signin-box">
        <div className="id-field">
          <span>아이디</span>
          <input type="text" />
        </div>
        <div className="pw-field">
          <span>비밀번호</span>
          <input type="text" />
        </div>
        <Link href="/">
          <a className="id-pw-find">아이디/비밀번호 찾기</a>
        </Link>
        <button className="btn-sign-in">로그인</button>
        <div className="image-wrapper" onClick={onExitClick}>
          <Image src="/exit.png" alt="exit" width="30px" height="30px" />
        </div>
      </div>

      <style jsx>
        {`
          .signin {
            width: 100vw;
            height: 100vh;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
            background-color: rgba(0, 0, 0, 0.7);
            display: ${signinDisplay};
            justify-content: center;
            align-items: center;

            .signin-box {
              width: 890px;
              height: 668px;
              background-color: white;
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border-radius: 10px;

              .id-field,
              .pw-field {
                display: flex;
                align-items: center;
                margin: 20px 0;
                span {
                  width: 100px;
                  font-size: 20px;
                }
                input {
                  width: 400px;
                  height: 30px;
                  border-radius: 10px;
                  border: 1px solid #f98600;
                }
              }

              .id-pw-find {
                margin: 20px 0;
              }
            }
            .btn-sign-in {
              width: 80px;
              height: 50px;
              border-radius: 10px;
              background-color: white;
              border: 1px solid #f98600;
            }

            .image-wrapper {
              position: absolute;
              top: 20px;
              right: 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SignIn;
