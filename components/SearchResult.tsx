import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchItem from "./SearchItem";
import { useSelector } from "react-redux";

type props = {
  resultClose: boolean;
  setResultClose: React.Dispatch<React.SetStateAction<boolean>>;
};
const SearchResult = ({ resultClose, setResultClose }: props) => {
  const map = useSelector((state): any => state.map);
  const [storeList, setStoreList] = useState<any>([
    {
      category_name: "테마파크",
      kakao_id: "22225498",
      phone: "0507-1352-1401",
      place_name: "산토끼노래동산",
      place_url: "http://place.map.kakao.com/22225498",
      road_address_name: "경남 창녕군 이방면 이방로 623",
      x: "128.383585226179",
      y: "35.5777087822771",
    },
  ]);

  useEffect(() => {
    if (map.map) {
      storeList.map((store: any) => {
        console.log(store.x);
        console.log(store.y);
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(store.y, store.x),
        });
        marker.setMap(map.map);
      });
    }
  }, [storeList]);

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
        {storeList.length == 0 ? (
          <span>no result</span>
        ) : (
          storeList.map((item: any, i: any) => (
            <SearchItem item={item} key={i} />
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
