import { SetStateAction, useEffect, useState } from "react";
import Map from "../components/Map";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import HamburgerMenu from "../components/HamburgerMenu";
import SearchResult from "../components/SearchResult";
import MatjipRegister from "../components/MatjipRegister";
import { rootState } from "../store/modules";
import { NextPage } from "next";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { getJwtCollegeId } from "../lib/util";
import { collegeInfoType, setSelectedCollege } from "../store/modules/selected";

interface propsType {
  collegeInfo: collegeInfoType;
}

const nearbyRestaurant: NextPage<propsType> = ({ collegeInfo }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSelectedCollege(collegeInfo));
  }, []);
  let user = useSelector((state: rootState) => state.user);
  const [resultClose, setResultClose] = useState(true);
  const [menuClose, setMenuClose] = useState(true);
  const [registerClose, setRegisterClose] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const resultCount = 10;

  useEffect(() => {
    let data = {
      keyword,
      college_id: collegeInfo.college_id.toString(),
      scope_start: (page - 1) * resultCount + 1 + "",
      scope_end: page * resultCount + "",
    };
    console.log(data);
    if (page !== 1) {
      const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place/search-place`;
      fetchWrapper
        .post(url, data)
        .then((data: any) => {
          console.log(data);
          let arr: any = [...searchResult, ...data];
          setSearchResult(arr);
        })
        .catch((err) => {
          alert("검색 결과가 없습니다.");
        });
    }
  }, [page]);

  const schema = yup.object().shape({
    searchTarget: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //로그인
  const onSubmit = (data: { searchTarget: string }) => {
    setPage(1);
    setKeyword(data.searchTarget);
    setResultClose(false);
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place/search-place`;
    fetchWrapper
      .post(url, {
        // keyword: data.searchTarget,
        keyword: data.searchTarget,
        college_id: collegeInfo.college_id.toString(),
        scope_start: (page - 1) * resultCount + 1 + "",
        scope_end: page * resultCount + "",
      })
      .then((data: any) => {
        setSearchResult(data);
      })
      .catch((err) => {
        alert("검색에 실패하였습니다.");
      });
  };
  const onClickPlus = () => {
    if (!user.user) {
      alert("로그인 후 이용해주세요");
    } else {
      setRegisterClose(false);
    }
  };

  return (
    <div className="nearby-restaurant">
      <Map y={collegeInfo.latitude} x={collegeInfo.longitude} />
      <MatjipRegister
        registerClose={registerClose}
        setRegisterClose={setRegisterClose}
      />
      <HamburgerMenu menuClose={menuClose} setMenuClose={setMenuClose} />
      <div className="content">
        <SearchResult
          resultClose={resultClose}
          setResultClose={setResultClose}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          setPage={setPage}
          page={page}
        />
        <form className="input-box" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="search"
            placeholder="장소, 분류 검색"
            {...register("searchTarget")}
          />
          <button className="ico-search">
            <Image src="/search.png" width={30} height={30} alt="search" />
          </button>
          <div className="ico-hamburger" onClick={() => setMenuClose(false)}>
            <Image
              src="/hamburger.png"
              width={30}
              height={30}
              alt="hamburger"
            />
          </div>
        </form>
      </div>

      <div className="plus-img-wrapper" onClick={onClickPlus}>
        <Image src="/plus.png" width={50} height={50} alt="plus" />
      </div>

      <style jsx>
        {`
          .content {
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;

            .input-box {
              z-index: 10;
              margin: 10px 20px;
              position: relative;

              input {
                padding: 0 50px;
              }

              .search {
                width: 300px;
                height: 40px;
                border-radius: 10px;
                border: 2px solid #f98600;
              }

              .ico-search {
                position: absolute;
                top: 6px;
                right: 10px;
                color: black;
                border: none;
                background: none;
              }

              .ico-hamburger {
                position: absolute;
                top: 6px;
                left: 10px;
              }
            }
          }

          .plus-img-wrapper {
            z-index: 3;
            position: absolute;
            bottom: 10px;
            right: 10px;
          }
          .plus-img-wrapper:hover {
            cursor: pointer;
          }

          @media (max-width: 780px) {
            .content {
              .input-box {
                margin: 10px 20px;
                position: relative;

                input {
                  padding: 0 50px;
                }

                .search {
                  width: 200px;
                  height: 40px;
                  border-radius: 10px;
                }
              }
            }
          }

          @media (max-width: 480px) {
            .content {
              .input-box {
                margin: 10px 20px;
                position: relative;

                input {
                  padding: 0 45px;
                }

                .search {
                  width: 120px;
                  height: 40px;
                  border-radius: 10px;
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
  const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/college/get-college`;
  let data: any;
  await fetchWrapper
    .post(url, { college_id: ctx.query.id })
    .then((d) => {
      data = d;
    })
    .catch((err) => console.log(err));

  return { props: { collegeInfo: data } };
}

export default nearbyRestaurant;
