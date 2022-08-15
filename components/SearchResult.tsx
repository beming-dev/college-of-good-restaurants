import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchItem from "./SearchItem";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../store/modules";
import { NextPage } from "next";
import { serverStoreType } from "../lib/types";
import { setResultClose } from "../store/modules/close";

type propsType = {
  searchResult: serverStoreType[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
};

const SearchResult: NextPage<propsType> = ({ searchResult, setPage, page }) => {
  const dispatch = useDispatch();
  const map = useSelector((state: rootState) => state.map);
  const close = useSelector((state: rootState) => state.close);

  useEffect(() => {
    if (map.map) {
      searchResult.map((store: serverStoreType) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            store.latitude,
            store.longitude
          ),
          clickable: true,
        });
        marker.setMap(map.map);

        const iwContent = `<a href="/store-detail?id=${store.place_id}" style="padding:5px;" >${store.name}</a>`;
        const iwRemovable = true;

        const infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemovable,
        });

        window.kakao.maps.event.addListener(marker, "click", () => {
          infowindow.open(map.map, marker);
        });
      });
    }
  }, [searchResult]);

  const onExitClick = () => {
    dispatch(setResultClose(true));
  };
  const onMoreClick = () => {
    setPage(page + 1);
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
          searchResult.map((item: serverStoreType) => (
            <SearchItem item={item} key={item["place_id"]} />
          ))
        )}
      </div>
      <div className="more">
        <button onClick={onMoreClick}>더보기</button>
      </div>
      <style jsx>
        {`
          .search-result {
            transition-duration: 0.5s;
            position: absolute;
            top: 0;
            left: ${close.resultClose ? -500 : 0}px;
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

            .result {
              display: flex;
              flex-direction: column;
              align-items: center;
              overflow-y: scroll;
            }
            .result::-webkit-scrollbar {
              width: 5px;
              background-color: white;
            }
            .result::-webkit-scrollbar-thumb {
              background-color: #f98600;
            }

            #select-sort {
              width: 70px;
              height: 30px;
              padding: 5px;
              border: none;
              outline: none;
            }

            .more {
              width: 100%;
              display: flex;
              justify-content: center;
              margin: 10px 0;
              button {
                border: none;
                width: 80%;
                height: 50px;
                border-radius: 10px;
                color: black;
                background-color: white;
                border: 1px solid #f98600;

                transition-duration: 0.5s;
              }
              button:hover {
                background-color: #f98600;
                color: white;
              }
            }
          }

          @media (max-width: 780px) {
            .search-result {
              left: ${close.resultClose ? -500 : 0}px;
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
              left: ${close.resultClose ? "calc(-100vw - 10px)" : "0vw"};
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
