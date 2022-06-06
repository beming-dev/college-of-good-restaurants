import React, { useState } from "react";
import Image from "next/image";
import SearchItem from "./SearchItem";

type props = {
  resultClose: boolean;
  setResultClose: React.Dispatch<React.SetStateAction<boolean>>;
};
const SearchResult = ({ resultClose, setResultClose }: props) => {
  const [storeList, setStoreList] = useState([]);

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
          storeList.map((item) => <SearchItem />)
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
        `}
      </style>
    </div>
  );
};

export default SearchResult;
