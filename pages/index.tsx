import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import Nav from '../components/Nav';
import Map from "../components/Map";
import CollegeRankItem from "../components/CollegeRankItem";

interface schoolInfoType {
  collegeName: string;
  studentNum: number;
}

const Home: NextPage = () => {
  const {register, handleSubmit, watch, formState:{errors}} = useForm();

  const schoolInfo: schoolInfoType[] = [
    { collegeName: "서울시립대", studentNum: 563 },
    { collegeName: "경희대", studentNum: 321 },
    { collegeName: "중앙대", studentNum: 123 },
  ];


  //대학교 이름인지 유효성 검사 필요
  const onSearch = (data: any):void => {
    if(!data.collegeName){
      alert("검색어를 입력해주세요.");
    }else{
      Router.push({
        pathname: '/nearby-restaurant',
        query: {target: data.collegeName}
      })
    }
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Map />
      <div className="cover">
        <div className="content">
          <span className="logo">맛집대학</span>
          <form className="input-box" onSubmit={handleSubmit(onSearch)}>
            <input type="text" placeholder="학교이름으로 검색해보세요" {...register("collegeName")}/>
            <div className="image-wrapper">
              <Image src="/search.png" width={30} height={30} alt="search" />
            </div>
          </form>
          <div className="school-rank">
            {schoolInfo.map((info, i) => (
              <CollegeRankItem
                collegeName={info.collegeName}
                studentNum={info.studentNum}
                key={i}
              />
            ))}
          </div>
        </div>
        <Nav/>
      </div>
      <style jsx>
        {`
          .cover {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
            z-index: 2;
            background-color: rgba(255, 255, 255, 0.5);

            .content {
              display: flex;
              flex-direction: column;
              align-items: center;

              .logo {
                font-family: "Nanum Pen Script";
                font-size: 6rem;
                padding-left: 4rem;
                letter-spacing: 4rem;
              }

              .input-box {
                position: relative;
                margin: 70px 0;
                input {
                  width: 540px;
                  height: 50px;
                  border-radius: 10px;
                  border: none;
                  padding: 0 50px;
                  font-size: 20px;
                  box-shadow: 1px 2px 2px black;
                  outline: none;
                }
                input::placeholder {
                  font-size: 15px;
                  text-align: center;
                }
                .image-wrapper {
                  position: absolute;
                  top: 10px;
                  left: 8px;
                }
              }

              .school-rank {
                width: 400px;
                height: fit-content;
                max-height: 400px;
                overflow-y: hidden;
              }
            }
          }

          @media (max-width: 780px) {
            .cover {
              .content {
                .logo {
                  font-size: 4rem;
                  padding-left: 3rem;
                  letter-spacing: 3rem;
                }

                .input-box {
                  margin: 63px 0;
                  input {
                    width: 485px;
                    height: 45px;
                    padding: 0 45px;
                    font-size: 18px;
                  }
                  input::placeholder {
                    font-size: 15px;
                    text-align: center;
                  }
                  .image-wrapper {
                    position: absolute;
                    top: 9px;
                    left: 8px;
                  }
                }

                .school-rank {
                  width: 360px;
                  height: fit-content;
                  max-height: 360px;
                  overflow-y: hidden;
                }
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
