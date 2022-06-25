import { useState } from "react";
import Map from "../components/Map";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";

import HamburgerMenu from "../components/HamburgerMenu";
import SearchResult from "../components/SearchResult";
import MatjipRegister from "../components/MatjipRegister";
import { rootState } from "../store/modules";
import { NextPage } from "next";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { getJwtCollegeId } from "../lib/util";

const nearbyRestaurant: NextPage<null> = () => {
  let user = useSelector((state: rootState) => state.user);
  const [resultClose, setResultClose] = useState(true);
  const [menuClose, setMenuClose] = useState(true);
  const [registerClose, setRegisterClose] = useState(true);
  const [searchResult, setSearchResult] = useState([]);

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

  //url수정 필요
  const onSubmit = (data: { searchTarget: string }) => {
    setResultClose(false);
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place/search-place`;
    fetchWrapper
      .post(url, {
        // keyword: data.searchTarget,
        keyword: "기꾸",
        "college-id": user.user && getJwtCollegeId(user.user),
      })
      .then((data) => setSearchResult(data));
  };
  const onClickPlus = () => {
    if (!user.user) {
      alert("로그인 후 이용해주세요");
    } else {
      setRegisterClose(false);
    }
  };

  return (
    <div>
      <Map />
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

export default nearbyRestaurant;
