import React, { useState } from "react";
import Image from "next/image";
import SearchItem from "./SearchItem";

type props = {
  resultClose: boolean;
  setResultClose: React.Dispatch<React.SetStateAction<boolean>>;
};
const SearchResult = ({ resultClose, setResultClose }: props) => {
  const [shopList, setShopList] = useState([]);

  const onExitClick = () => {
    setResultClose(true);
  };
  return (
    <div className="search-result">
      <div className="input-box">
        <div className="hamburger-img-box">
          <Image src="/hamburger-grey.png" width="30px" height="30px" />
        </div>
        <div className="exit-img-box" onClick={onExitClick}>
          <Image src="/exit-grey.png" width="25px" height="25px" />
        </div>
        <input type="text" />
      </div>
      <select name="sort" id="select-sort">
        <option value="rate">평점순</option>
        <option value="review">리뷰순</option>
      </select>
      <div className="result">
        {shopList.length == 0 ? (
          <span>no result</span>
        ) : (
          shopList.map((item) => <SearchItem />)
        )}
      </div>
      <style jsx>
        {`
          .search-result {
            transition-duration: 1s;
            position: absolute;
            top: 0;
            left: ${resultClose ? -400 : 0}px;
            background: white;
            width: 400px;
            height: 100vh;
            z-index: 3;
            display: flex;
            flex-direction: column;

            .input-box {
              width: 100%;
              padding: 5px;
              position: relative;
              .hamburger-img-box {
                position: absolute;
                top: 10px;
                left: 10px;
              }
              .exit-img-box {
                position: absolute;
                top: 15px;
                right: 30px;
              }
              input {
                width: 60%;
                height: 40px;
                border: 0px solid grey;
                border-radius: 10px;
                box-shadow: 1px 2px 1px 1px #cccccc;
                outline: none;
                padding: 0 40px;
              }
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
