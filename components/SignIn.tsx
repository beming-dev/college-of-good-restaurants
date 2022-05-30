import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { userService } from "../services/user.service";
import { useForm } from "react-hook-form";

type props = {
  signinDisplay: string;
  setSigninDisplay: React.Dispatch<React.SetStateAction<string>>;
};

const SignIn = ({ signinDisplay, setSigninDisplay }: props) => {
  const onExitClick = () => {
    setSigninDisplay("none");
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any): void => {
    console.log(process.env.NEXT_PUBLIC_SERVER_IP);
    if (data.id === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    if (data.pw === "") {
      alert(" 비밀번호를 입력해주세요");
      return;
    }

    userService.login(data.id, data.pw);
  };

  return (
    <div className="signin">
      <form className="signin-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="id-field">
          <span>아이디</span>
          <input type="text" {...register("id")} />
        </div>
        <div className="pw-field">
          <span>비밀번호</span>
          <input type="password" {...register("pw")} />
        </div>
        <Link href="/">
          <a className="id-pw-find">아이디/비밀번호 찾기</a>
        </Link>
        <input type="submit" className="btn-sign-in" value="로그인" />
        <div className="image-wrapper" onClick={onExitClick}>
          <Image src="/exit.png" alt="exit" width="30px" height="30px" />
        </div>
      </form>

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
              width: 450px;
              height: 330px;
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
                margin: 10px 0;
                span {
                  width: 100px;
                  font-size: 15px;
                }
                input {
                  width: 200px;
                  height: 30px;
                  border-radius: 10px;
                  border: 1px solid #f98600;
                }
              }

              .id-pw-find {
                margin: 25px 0;
              }
            }
            .btn-sign-in {
              width: 80px;
              height: 40px;
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
