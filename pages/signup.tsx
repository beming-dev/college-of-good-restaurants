import React, { useState } from "react";
import type { NextPage } from "next";
import {useForm, Control} from "react-hook-form";
import axios from 'axios';

interface signupForm{
  mail:string
  authCode: string
  id:string
  pw:string
}

const Signup: NextPage = () => {
  const {register, handleSubmit, watch, formState:{errors}} = useForm<signupForm>();

  const onSendAuthCode = (data:signupForm) =>{
    axios({
      url: `${process.env.SERVER_IP} + user-management/signup/send-auth-code`,
    })
  }

  const onCheckAuthCode = (data:signupForm) =>{
    axios({
      url: `${process.env.SERVER_IP} + user-management/signup/check-auth-code`,
    })
  }

  const onSignupSubmit = (data:signupForm) => {
  }

  return (
    <div className="signup">
      <span className="title">맛집대학 회원가입</span>

      <form className="mail-box box" onSubmit={handleSubmit(onSendAuthCode)}>
        <span>학교메일주소</span>
        <input type="text" {...register("mail")}/>
        <input type="submit" className='button'value="인증코드전송"/>
      </form>
      <form onSubmit={handleSubmit(onCheckAuthCode)} className="certificate-box box">
        <span>인증코드</span>
        <input type="text" {...register("authCode")}/>
        <input type="submit" className='button'value="인증코드확인"/>
      </form>
      <form onSubmit={handleSubmit(onSignupSubmit)} className='signup-form'>
        <div className="id-box box">
          <span>아이디</span>
          <input type="text" {...register("id")}/>
          <input type="submit" className='button'value="중복확인"/>
        </div>
        <div className="pw-box box">
          <span>비밀번호</span>
          <input type="text" {...register("pw")}/>
        </div>
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

            .button {
              width: 100px;
              margin-left: 20px;
              border-radius: 3px;
              border: none;
              background: #c4c4c4;
            }
          }

          .signup-form{
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;

            .btn-signup {
              width: 150px;
              height: 50px;
              background: white;
              border: 1px solid #e8630a;
              border-radius: 10px;
              margin-top: 50px;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;
