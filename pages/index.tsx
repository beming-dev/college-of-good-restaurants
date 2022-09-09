import Image from "next/image";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";

import Nav from "../components/Nav";
import CollegeRankItem from "../components/CollegeRankItem";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { createFuzzyMatcher } from "../lib/util";
import { useWindowSize } from "../lib/hook";
import { collegeInfoType, windowSizeType } from "../lib/types";

const Home: NextPage = () => {
  const windowSize: windowSizeType = useWindowSize();

  const [collegeListOrigin, setCollegeListOrigin] = useState<collegeInfoType[]>(
    []
  );
  const [collegeList, setCollegeList] = useState<collegeInfoType[]>([]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/common/college-student-count`;
    fetchWrapper.post(url, {}).then((data: collegeInfoType[]) => {
      setCollegeListOrigin(data);
    });
  }, []);

  useEffect(() => {
    setCollegeList(
      collegeListOrigin.sort((a: collegeInfoType, b: collegeInfoType) =>
        collegeSort(a, b)
      )
    );
  }, [collegeListOrigin]);

  const collegeSort = (a: collegeInfoType, b: collegeInfoType) => {
    if (a.number_of_students == b.number_of_students) {
      return a.college_name > b.college_name ? 1 : -1;
    }
    return a.number_of_students < b.number_of_students ? 1 : -1;
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollegeList(
      collegeListOrigin
        .sort((a: collegeInfoType, b: collegeInfoType) => collegeSort(a, b))
        .filter((college: collegeInfoType) =>
          createFuzzyMatcher(e.target.value).test(college["college_name"])
        )
    );
  };

  return (
    <main>
      <div className="img-background"></div>
      <article className="content">
        <h1 className="logo">맛집대학</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="학교이름으로 검색해보세요"
            onChange={onSearchChange}
            autoComplete="off"
          />
          <div className="img-wrapper">
            <Image src="/search.png" width={30} height={30} alt="search" />
          </div>
        </div>
        <div className="school-rank">
          {collegeList.map(
            (info, i) =>
              i < (windowSize.height && windowSize.height < 700 ? 6 : 8) && (
                <CollegeRankItem
                  collegeName={info["college_name"]}
                  studentNum={info["number_of_students"]}
                  collegeId={info["college_id"]}
                  key={i}
                />
              )
          )}
        </div>
        <Nav />
      </article>
      <style jsx>
        {`
          .img-background {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100vw;
            height: 100vh;
            background-image: url("/background.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }

          .content {
            width: 100vw;
            height: 100vh;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            background-color: rgba(255, 255, 255, 0.5);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;

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
              .img-wrapper {
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

          @media (max-width: 780px) {
            .content {
              .logo {
                font-size: 4rem;
                padding-left: 3rem;
                letter-spacing: 3rem;
              }

              .input-box {
                margin: 63px 0;
                input {
                  width: 400px;
                  height: 45px;
                  padding: 0 45px;
                  font-size: 18px;
                }
                input::placeholder {
                  font-size: 15px;
                  text-align: center;
                }
                .img-wrapper {
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

          @media (max-width: 545px) {
            .content {
              .input-box {
                margin: 63px 0;
                input {
                  width: 350px;
                  height: 45px;
                  padding: 0 45px;
                  font-size: 18px;
                }
              }

              .school-rank {
                width: 300px;
                height: fit-content;
                max-height: 360px;
                overflow-y: hidden;
              }
            }
          }

          @media (max-width: 480px) {
            .content {
              .logo {
                font-size: 3rem;
                padding-left: 2rem;
                letter-spacing: 2rem;
              }

              .input-box {
                input {
                  width: 200px;
                  height: 45px;
                  padding: 0 50px;
                  font-size: 15px;
                }
                input::placeholder {
                  font-size: 13px;
                  text-align: center;
                }
                .img-wrapper {
                  position: absolute;
                  top: 9px;
                  left: 10px;
                }
              }

              .school-rank {
                width: 240px;
                height: fit-content;
                max-height: 360px;
                overflow-y: hidden;
              }
            }
          }
          @media (max-height: 700px) {
            .content {
              height: fit-content;
              .input-box {
                margin: 40px 0;
              }
              .school-rank {
                height: 300px;
                min-height: 300px;
              }
            }
          }
        `}
      </style>
    </main>
  );
};

export default Home;
