import React, { useState } from "react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import * as yup from "yup";

interface signupForm {
  email: string;
  "auth-code": string;
  "user-id": string;
  password: string;
  nickname: string;
}

const Signup: NextPage = () => {
  const [codeChecked, setCodeChecked] = useState(false);

  const schema = yup.object().shape({
    nickname: yup.string().required("nickname is required"),
    "user-id": yup
      .string()
      .required("id is required")
      .matches(/^[A-za-z0-9]{5,15}/g, "5~15자 영문, 숫자"),
    password: yup
      .string()
      .required("pw is required")
      .matches(/(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-]).{6,24}/),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signupForm>({
    resolver: yupResolver(schema),
  });

  const onSendAuthCode = (data: signupForm) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/user-management/signup/send-auth-code`;
    fetchWrapper
      .post(url, { email: data.email })
      .then((data) => alert("인증번호를 전송했습니다."))
      .catch((err) => {
        console.log(err);
        alert("전송에 실패했습니다.");
      });
  };

  const onCheckAuthCode = (data: signupForm) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/user-management/signup/check-auth-code`;
    fetchWrapper
      .post(url, {
        email: data.email,
        "auth-code": data["auth-code"],
      })
      .then((data) => {
        console.log(data);
      });
  };

  const onSignupSubmit = (data: signupForm) => {
    if (!codeChecked) {
      alert("학교 메일을 인증해주세요.");
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/user-management/signup`;
    fetchWrapper.post(url, { ...data });
  };

  return (
    <div className="signup">
      <span className="title">맛집대학 회원가입</span>

      <form className="mail-box box" onSubmit={handleSubmit(onSendAuthCode)}>
        <span>학교메일주소</span>
        <input type="text" {...register("email")} />
        <input type="submit" className="button" value="인증코드전송" />
      </form>
      <p className="err-message"></p>
      <form
        onSubmit={handleSubmit(onCheckAuthCode)}
        className="certificate-box box"
      >
        <span>인증코드</span>
        <input type="text" {...register("auth-code")} />
        <input type="submit" className="button" value="인증코드확인" />
      </form>
      <p className="err-message"></p>
      <form onSubmit={handleSubmit(onSignupSubmit)} className="signup-form">
        <div className="nickname-box box">
          <span>닉네임</span>
          <input type="text" {...register("nickname")} />
          <input type="submit" className="button" value="중복확인" />
        </div>
        <p className="err-message">{errors.nickname?.message}</p>
        <div className="id-box box">
          <span>아이디</span>
          <input type="text" {...register("user-id")} />
          <input type="submit" className="button" value="중복확인" />
        </div>
        <p className="err-message">{errors["user-id"]?.message}</p>
        <div className="pw-box box">
          <span>비밀번호</span>
          <input type="text" {...register("password")} />
        </div>
        <p className="err-message">{errors.password?.message}</p>
        <button className="btn-signup">회원가입</button>
      </form>
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
            span {
              width: 120px;
            }
            input {
              width: 200px;
              height: 20px;
              border: 1px solid #e8630a;
              border-radius: 3px;
            }

            .button {
              width: 100px;
              margin-left: 20px;
              border-radius: 3px;
              border: none;
              background: #c4c4c4;
            }
          }

          .err-message {
            color: red;
            font-size: 13px;
            margin-bottom: 40px;
          }

          .signup-form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .btn-signup {
              transition-duration: 0.5s;
              width: 150px;
              height: 50px;
              background: white;
              border: 1px solid #e8630a;
              border-radius: 10px;
              margin-top: 50px;
            }

            .btn-signup:hover {
              background-color: #e8630a;
              color: white;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;
