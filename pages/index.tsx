import Head from "next/head";
import Image from "next/image";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import Nav from "../components/Nav";
import Map from "../components/Map";
import CollegeRankItem from "../components/CollegeRankItem";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { createFuzzyMatcher } from "../lib/util";

interface collegeInfoType {
  collegeName: string;
  studentNum: number;
}
interface props {
  college: collegeInfoType[];
}

const Home: NextPage<props> = ({ college }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const cl = college;

  const [collegeList, setCollegeList] = useState<collegeInfoType[]>(cl);

  const onSearchChange = (e: any) => {
    setCollegeList(
      cl.filter((college: collegeInfoType) =>
        createFuzzyMatcher(e.target.value).test(college.collegeName)
      )
    );
  };

  //대학교 이름인지 유효성 검사 필요
  const onSearch: SubmitHandler<FieldValues> = (data) => {
    if (!data.collegeName) {
      alert("검색어를 입력해주세요.");
    } else {
      router.push({
        pathname: "/nearby-restaurant",
        query: { target: data.collegeName },
      });
    }
  };

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
            <input
              type="text"
              placeholder="학교이름으로 검색해보세요"
              {...register("collegeName")}
              onChange={onSearchChange}
            />
            <div className="image-wrapper">
              <Image src="/search.png" width={30} height={30} alt="search" />
            </div>
          </form>
          <div className="school-rank">
            {collegeList.map(
              (info, i) =>
                i < 8 && (
                  <CollegeRankItem
                    collegeName={info.collegeName}
                    studentNum={info.studentNum}
                    key={i}
                  />
                )
            )}
          </div>
        </div>
        <Nav />
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
                min-height: 400px;
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

export async function getServerSideProps(ctx: any) {
  const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/common/college-student-count`;
  let data;
  await fetchWrapper.post(url, {}).then((d) => (data = d));

  return { props: { college: [] } };
}
export default Home;
