import React, { useState } from "react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import * as yup from "yup";
import Router, { useRouter } from "next/router";

interface signupForm {
  email: string;
  auth_code: string;
  user_id: string;
  password: string;
  nickname: string;
}

const Signup: NextPage = () => {
  const [codeChecked, setCodeChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [idChecked, setIdChecked] = useState(false);
  const router = useRouter();

  const idExp = /^[A-za-z0-9]{5,15}/g;
  const pwExp = /(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-]).{6,24}/;
  const schema = yup.object().shape({
    nickname: yup.string().required("nickname is required"),
    user_id: yup
      .string()
      .required("id is required")
      .matches(idExp, "5~15자 영문, 숫자"),
    password: yup.string().required("pw is required").matches(pwExp),
  });

  const {
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signupForm>({
    resolver: yupResolver(schema),
  });

  const onSendAuthCode = () => {
    let leg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!leg.test(getValues().email)) {
      alert("올바른 이메일을 입력해주세요");
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/user-management/signup/send-auth-code`;
    fetchWrapper
      .post(url, { email: getValues().email })
      .then((data) => alert("인증번호를 전송했습니다."))
      .catch((err) => {
        alert("전송에 실패했습니다.");
      });
  };

  const onCheckAuthCode = () => {
    const v = getValues();
    console.log({
      email: v.email,
      auth_code: v["auth_code"],
    });
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/user-management/signup/check-auth-code`;
    fetchWrapper
      .post(url, {
        email: v.email,
        auth_code: v["auth_code"],
      })
      .then((data) => {
        setCodeChecked(true);
      })
      .catch((err) => {
        alert("인증코드 확인에 실패하였습니다.");
      });
  };

  const onSignupSubmit = (data: signupForm) => {
    if (!codeChecked) {
      alert("학교 메일을 인증해주세요.");
      return;
    }
    if (!nicknameChecked) {
      alert("닉네임 중복확인을 해주세요.");
      return;
    }
    if (!idChecked) {
      alert("아이디 중복확인을 해주세요.");
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/user-management/signup`;
    fetchWrapper
      .post(url, { ...data })
      .then(() => {
        console.log("회원가입이 완료됐습니다.");
        router.push("/");
      })
      .catch((err) => {
        alert("회원가입에 실패했습니다.");
      });
  };

  const onIdCheck = () => {
    if (!codeChecked) {
      alert("학교 메일을 인증해주세요.");
      return;
    }
    if (idExp.test(getValues()["user_id"])) {
      const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/user-management/signup/check-user-id`;
      fetchWrapper
        .post(url, { user_id: getValues()["user_id"] })
        .then((data: any) => {
          if (data.message == "id is possible to use") {
            alert("사용가능한 아이디입니다.");
            setIdChecked(true);
          } else {
            alert("중복된 아이디입니다.");
          }
        })
        .catch((err) => {
          alert("아이디 중복 확인에 실패하였습니다.");
        });
    } else {
      alert("5~15자 영문, 숫자를 입력해주세요.");
    }
  };

  const onNicknameCheck = () => {
    if (!codeChecked) {
      alert("학교 메일을 인증해주세요.");
      return;
    }
    if (getValues().nickname !== "") {
      const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/user-management/signup/check-user-nickname`;
      fetchWrapper
        .post(url, {
          email: getValues().email,
          nickname: getValues().nickname,
        })
        .then((data: any) => {
          if (data.message == "nickname is possible to use") {
            alert("사용 가능한 닉네임입니다.");
            setNicknameChecked(true);
          } else {
            alert("중복된 닉네임입니다.");
          }
        })
        .catch((err) => {
          alert("닉네임 중복 확인에 실패하였습니다.");
        });
    } else {
      alert("닉네임을 입력해주세요.");
    }
  };

  return (
    <div className="signup">
      <span className="title">맛집대학 회원가입</span>

      <div className="mail-box box">
        <span>학교메일주소</span>
        <input type="text" {...register("email")} />
        <input
          type="submit"
          className="button"
          value="인증코드전송"
          onClick={onSendAuthCode}
          onChange={() => setCodeChecked(false)}
        />
      </div>
      <p className="err-message"></p>
      <div className="certificate-box box">
        <span>인증코드</span>
        <input type="text" {...register("auth_code")} />
        <input
          type="submit"
          className="button"
          value="인증코드확인"
          onClick={onCheckAuthCode}
        />
      </div>
      <p className="err-message"></p>
      <form onSubmit={handleSubmit(onSignupSubmit)} className="signup-form">
        <div className="nickname-box box">
          <span>닉네임</span>
          <input
            type="text"
            {...register("nickname")}
            onChange={() => setNicknameChecked(false)}
          />
          <input
            type="button"
            className="button"
            value="중복확인"
            onClick={onNicknameCheck}
          />
        </div>
        <p className="err-message">{errors.nickname?.message}</p>
        <div className="id-box box">
          <span>아이디</span>
          <input
            type="text"
            {...register("user_id")}
            onChange={() => setNicknameChecked(false)}
          />
          <input
            type="button"
            className="button"
            value="중복확인"
            onClick={onIdCheck}
          />
        </div>
        <p className="err-message">{errors["user_id"]?.message}</p>
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
            font-size: 4.5rem;
            color: #e8630a;
            margin-bottom: 50px;
          }
          .box {
            width: 450px;
            display: flex;
            span {
              width: 27%;
            }
            input {
              width: 44%;
              height: 20px;
              border: 1px solid #e8630a;
              border-radius: 3px;
            }

            .button {
              width: 22%;
              margin-left: 20px;
              border-radius: 3px;
              border: none;
              color: white;
              background: #e8630a;
              transition-duration: 0.5s;
            }
            .button:hover {
              color: #e8630a;
              background: white;
              border: 1px solid #e8630a;
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

        @media (max-width: 720px) {
          .signup {
            .title {
              font-size: 3.5rem;
            }
          }
        }

        @media (max-width: 480px) {
          .signup {
            .title {
              font-size: 2.5rem;
            }

            .box {
              flex-direction: column;
              align-items: center;
              justify-content: center;

              span {
                width: auto;
              }
              input[type="text"] {
                margin: 5px 0;
              }
              .button {
                margin: 0;
              }
            }

            .err-message {
              margin: 10px 0px;
            }

            .btn-signup {
              margin-top: 10px !important;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;
