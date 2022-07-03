import { NextPage } from "next";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../store/modules";
import { setSelectedSearchResult } from "../store/modules/selected";

interface storeInfo {
  ["something"]: string;
}

//type 수정 필요
const RegisterItem: NextPage<any> = ({ storeInfo }) => {
  const selectedSearchItem = useSelector(
    (state: rootState) => state.selected
  ).selectedSearchResult;
  const dispatch = useDispatch();
  return (
    <div
      className="search-item"
      onClick={() => dispatch(setSelectedSearchResult(storeInfo))}
    >
      <div className="store-image-wrapper"></div>
      <div className="introduce">
        <span className="store-name">{storeInfo.place_name}</span>
        <span className="address">{storeInfo.road_address_name}</span>
      </div>
      <style jsx>
        {`
          .search-item {
            width: 100%;
            height: 50px;
            padding: 0px 50px;
            border-top: 1px solid #f98600;
            border-bottom: 1px solid #f98600;
            transition-duration: 0.5s;
            background-color: ${selectedSearchItem &&
            selectedSearchItem.id === storeInfo.id
              ? "#f98600"
              : "white"};
            .introduce {
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
            }
          }
          .search-item:hover {
            background-color: #f98600;
          }

          @media (max-width: 550px) {
            .search-item {
              width: 100%;
              padding: 0px 30px;
              font-size: 14px;
              .introduce {
                display: flex;
                flex-direction: column;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default RegisterItem;
