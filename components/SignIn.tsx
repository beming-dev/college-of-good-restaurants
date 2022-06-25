import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { login } from "../store/modules/user";
import { rootState } from "../store/modules";
import { NextPage } from "next";

type props = {
  signinDisplay: boolean;
  setSigninDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignIn: NextPage<props> = ({ signinDisplay, setSigninDisplay }) => {
  const logUser = useSelector((state: rootState) => state.user);
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const dispatch = useDispatch();

  const onExitClick = () => {
    setSigninDisplay(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { id: string; pw: string }): void => {
    if (data.id === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    if (data.pw === "") {
      alert(" 비밀번호를 입력해주세요");
      return;
    }

    const baseUrl = `${publicRuntimeConfig.apiUrl}`;
    fetchWrapper
      .post(`${baseUrl}/user-management/login`, {
        username: data.id,
        password: data.pw,
        user: logUser.user,
      })
      .then(async (user) => {
        await dispatch(login(user));
        localStorage.setItem("user", JSON.stringify(user.jwt));
        router.push("/");
        return user;
      });
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
            display: ${signinDisplay ? "flex" : "none"};
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
