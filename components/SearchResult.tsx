import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchItem from "./SearchItem";
import { useSelector } from "react-redux";
import { rootState } from "../store/modules";
import { NextPage } from "next";
import { storeFromServer, storeType } from "./Map";

type propsType = {
  searchResult: storeFromServer[];
  resultClose: boolean;
  setResultClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchResult: NextPage<propsType> = ({
  searchResult,
  resultClose,
  setResultClose,
}) => {
  const map = useSelector((state: rootState) => state.map);

  useEffect(() => {
    if (map.map) {
      searchResult.map((store: storeFromServer) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            store.latitude,
            store.longitude
          ),
        });
        marker.setMap(map.map);
      });
    }
  }, [searchResult]);

  const onExitClick = () => {
    setResultClose(true);
  };
  return (
    <div className="search-result">
      <div className="exit-img-box" onClick={onExitClick}>
        <Image src="/exit-grey.png" width="25px" height="25px" />
      </div>
      <select name="sort" id="select-sort">
        <option value="rate">평점순</option>
        <option value="review">리뷰순</option>
      </select>
      <div className="result">
        {searchResult.length == 0 ? (
          <span>no result</span>
        ) : (
          searchResult.map((item: storeFromServer) => (
            <SearchItem item={item} key={item["place_id"]} />
          ))
        )}
      </div>
      <style jsx>
        {`
          .search-result {
            transition-duration: 0.5s;
            position: absolute;
            top: 0;
            left: ${resultClose ? -500 : 0}px;
            background: white;
            width: 490px;
            height: calc(100vh - 70px);
            z-index: 3;
            display: flex;
            flex-direction: column;
            padding-top: 70px;
            padding-left: 10px;

            .exit-img-box {
              position: absolute;
              top: 20px;
              right: 30px;
            }

            #select-sort {
              width: 70px;
              height: 30px;
              padding: 5px;
              border: none;
              outline: none;
            }
          }

          @media (max-width: 780px) {
            .search-result {
              left: ${resultClose ? -500 : 0}px;
              width: 400px;
              height: calc(100vh - 70px);
              z-index: 3;
              display: flex;
              flex-direction: column;
              padding-top: 70px;
              padding-left: 10px;

              .exit-img-box {
                position: absolute;
                top: 20px;
                right: 30px;
              }

              #select-sort {
                width: 70px;
                height: 30px;
                padding: 5px;
                border: none;
                outline: none;
              }
            }
          }

          @media (max-width: 480px) {
            .search-result {
              left: ${resultClose ? "calc(-100vw - 10px)" : "0vw"};
              width: calc(100vw - 10px);
              padding-top: 70px;
              padding-left: 10px;

              .exit-img-box {
                position: absolute;
                top: 20px;
                right: 30px;
              }

              #select-sort {
                width: 70px;
                height: 30px;
                padding: 5px;
                border: none;
                outline: none;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default SearchResult;
