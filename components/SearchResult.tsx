import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchItem from "./SearchItem";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../store/modules";
import { NextPage } from "next";
import { serverStoreType } from "../lib/types";
import { setResultClose } from "../store/modules/close";
import _ from "lodash";

type propsType = {
  setSearchResult: any;
  searchResult: serverStoreType[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
};

const SearchResult: NextPage<propsType> = ({
  searchResult,
  setPage,
  page,
  setSearchResult,
}) => {
  const dispatch = useDispatch();
  const map = useSelector((state: rootState) => state.map);
  const close = useSelector((state: rootState) => state.close);

  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    const markerArr: any[] = [];

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

        markerArr.push(marker);

        const iwContent = `
          <div style="display:flex; flex-direction:column; justify-content:center; padding:5px; width:250px"> 
            <a href="/store-detail?id=${
              store.place_id
            }" style="margin-bottom:5px;">
              ${store.name}
            </a>
            <div style="display:flex; align-items:center; margin-bottom:5px;">
              ${_.range(store.rating)
                .map(
                  () =>
                    "<img src='/star-yellow.png' style='width:15px; height:15px; margin-right:2px;'/>"
                )
                .join("")}

              ${_.range(store.rating, 5)
                .map(
                  () =>
                    "<img src='/star.png' style='width:15px; height:15px; margin-right:2px;'/>"
                )
                .join("")}
              <span style="margin-left:5px;">(${store.review_count})</span>
            </div>
            <span style="font-size:13px; margin:5px 0">${
              store.phone || "00-0000-0000"
            }</span>
            <span style="font-size:13px; margin:5px 0">${store.address}</span>
          </div>
        `;
        const iwRemovable = true;

        const infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemovable,
        });

        window.kakao.maps.event.addListener(marker, "click", () => {
          infowindow.open(map.map, marker);
        });
      });
      setMarkers(markerArr);
    }
  }, [searchResult, map]);

  const onExitClick = () => {
    dispatch(setResultClose(true));
  };
  const onMoreClick = () => {
    if (page * 10 === searchResult.length) {
      setPage(page + 1);
    }
  };

  const onSortChange = (e: any) => {
    let newRes;
    if (e.target.value === "rate") {
      newRes = searchResult.sort((a: serverStoreType, b: serverStoreType) => {
        return b.rating - a.rating;
      });
    } else {
      newRes = searchResult.sort((a: serverStoreType, b: serverStoreType) => {
        return b.review_count - a.review_count;
      });
    }
    setSearchResult([...newRes]);
  };

  return (
    <div className="search-result">
      <div className="exit-img-box" onClick={onExitClick}>
        <Image src="/exit-grey.png" width="25px" height="25px" />
      </div>
      <select name="sort" id="select-sort" onChange={onSortChange}>
        <option value="rate">평점순</option>
        <option value="review">리뷰순</option>
      </select>
      <div className="result">
        {searchResult.length == 0 ? (
          <span>no result</span>
        ) : (
          searchResult.map((item: serverStoreType) => (
            <SearchItem item={item} key={item["place_id"]} typ="" />
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
              padding: 0 10px;
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
