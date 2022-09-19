import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { serverStoreType } from "../lib/types";

interface propsType {
  item: serverStoreType;
  typ: string;
}
const SearchItem: NextPage<propsType> = ({ item, typ }) => {
  const router = useRouter();
  const onItemClick = () => {
    router.push(`/store-detail?id=${item["place_id"]}`);
  };
  return (
    <div className="search-item" onClick={onItemClick}>
      <div className="txt-area">
        <span className="title">{item.name}</span>
        <div className="review-area">
          <span className="txt-rate">{item.rating.toPrecision(2)} </span>
          <div className="img-rate"></div>
          <span className="review-num"> ({item.review_count})</span>
        </div>
        <span className="address">{item.address}</span>
      </div>

      <style jsx>
        {`
          .search-item {
            margin: 10px 0;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: ${typ === "mypage" ? "10px" : "0"};
            background-color: ${typ === "mypage" ? "#cccccc" : "white"};
            border-radius: ${typ === "mypage" ? "10px" : "0"};

            .txt-area {
              display: flex;
              flex-direction: column;

              .review-area {
                display: flex;
                align-items: center;
                margin: 5px 0;
              }
            }
          }

          @media (max-width: 780px) {
            .search-item {
              width: 90%;
            }
          }
          @media (max-width: 480px) {
          }
        `}
      </style>
    </div>
  );
};

export default SearchItem;
