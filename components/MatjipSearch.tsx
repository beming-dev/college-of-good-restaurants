import { spawn } from "child_process";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../store/modules";
import {
  collegeInfoType,
  setSelectedSearchResult,
} from "../store/modules/selected";
import { storeType } from "./Map";
import RegisterItem from "./RegisterItem";
type search = {
  [x: string]: string;
};

const MatjipSearch = ({ pageConvert, setPageConvert }: any) => {
  const [pages, setPages] = useState(0);
  const [curPage, setCurPage] = useState(0);
  const [searchTarget, setSearchTarget] = useState("");
  const [searchResult, setSearchResult] = useState<storeType[]>([]);
  const selectedSearchResult = useSelector(
    (state: rootState) => state.selected
  ).selectedSearchResult;
  const dispatch = useDispatch();
  let state = useSelector((state: rootState) => state.selected);
  let { selectedCollege }: { selectedCollege: collegeInfoType } = state;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSearchComplete = (
    data: storeType[],
    status: any,
    pagination: any
  ) => {
    setPages(pagination.last);
    setSearchResult(data);
    if (data.length !== 0) {
      dispatch(setSelectedSearchResult(data[0]));
    }
  };

  const onSearch: SubmitHandler<search> = (data, page) => {
    if (data.target === "") {
      setSearchResult([]);
      dispatch(setSelectedSearchResult(null));
    } else {
      const ps = new window.kakao.maps.services.Places();
      const searchOption = {
        x: selectedCollege.longitude,
        y: selectedCollege.latitude,
        radius: parseInt(`${selectedCollege.distance_limit_km}`) * 1000,
        page,
      };
      setCurPage(1);
      setSearchTarget(data.target);
      ps.keywordSearch(data.target, onSearchComplete, searchOption);
    }
  };

  const onConvert = (dir: number) => {
    if (dir === 1 && selectedSearchResult) {
      setPageConvert(true);
    } else {
      setPageConvert(false);
    }
  };

  const onPageClick = (e: any, page: any) => {
    const ps = new window.kakao.maps.services.Places();
    const searchOption = {
      x: selectedCollege.longitude,
      y: selectedCollege.latitude,
      radius: parseInt(`${selectedCollege.distance_limit_km}`) * 1000,
      page,
    };
    setCurPage(page);
    ps.keywordSearch(searchTarget, onSearchComplete, searchOption);
  };

  return (
    <div className="matjip-search">
      <form onSubmit={handleSubmit((data) => onSearch(data, 1))}>
        <input
          type="text"
          {...register("target")}
          className="search"
          placeholder="등록할 맛집을 검색해보세요"
        />
        <div className="search-image-wrapper">
          <Image src="/search.png" width="35px" height="35px" />
        </div>
      </form>
      <div className="result-box">
        {searchResult.length !== 0 ? (
          searchResult.map((result: any, i: number) => (
            <RegisterItem storeInfo={result} key={i} />
          ))
        ) : (
          <span>no result</span>
        )}
      </div>
      <div className="pages">
        {_.range(pages).map((num, i) => (
          <span
            className={num + 1 === curPage ? "bold" : ""}
            onClick={(e) => onPageClick(e, num + 1)}
            key={i}
          >
            {num + 1}
          </span>
        ))}
      </div>
      <button className="btn-register" onClick={() => onConvert(1)}>
        등록
      </button>

      <style jsx>
        {`
          .matjip-search {
            min-width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            position: relative;
            top: 0;
            left: ${pageConvert ? -100 : 0}%;
            transition-duration: 1s;

            form {
              width: 70%;
              margin-bottom: 50px;
              position: relative;
              .search {
                width: calc(100% - 40px);
                height: 40px;
                padding: 0px 20px;
                border-radius: 10px;
                border: 2px solid #f98600;
                box-shadow: 0px 2px 1px grey;
              }
              .search::placeholder {
                text-align: center;
                color: black;
              }
              .search-image-wrapper {
                position: absolute;
                top: 5px;
                right: 10px;
              }
            }

            .result-box {
              width: 100%;
              height: 380px;
              overflow-x: hidden;
              overflow-y: scroll;
            }

            .result-box::-webkit-scrollbar {
              width: 5px;
              background-color: grey;
            }
            .result-box::-webkit-scrollbar-thumb {
              background-color: #f98600;
            }
            .result-box::-webkit-scrollbar-track {
            }

            .pages {
              height: 20px;
              margin-top: 5px;

              span {
                margin: 0 3px;
              }

              .bold {
                font-weight: bold;
              }
            }

            .btn-register {
              transition-duration: 0.5s;
              width: 100px;
              height: 50px;
              border: 1px solid #f98600;
              background-color: white;
              margin-top: 10px;
              border-radius: 5px;
            }
            .btn-register:hover {
              background-color: #f98600;
              color: white;
            }
          }

          @media (max-width: 930px) {
            .matjip-search {
              height: 100%;
              form {
                margin-bottom: 30px;
              }
              .result-box {
                height: 280px;
              }
            }
          }

          @media (max-width: 780px) {
            .matjip-search {
              form {
                margin-bottom: 30px;
              }
              .result-box {
                height: 250px;
              }
            }
          }

          @media (max-width: 550px) {
            .matjip-search {
              justify-content: space-between;
              form {
                margin-bottom: 20px;
                .search {
                  width: calc(100% - 40px);
                  height: 40px;
                  padding: 0px 20px;
                  border-radius: 10px;
                }
              }
              .result-box {
                height: 250px;
              }

              .btn-register {
                transition-duration: 0.5s;
                width: 80px;
                height: 40px;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default MatjipSearch;
