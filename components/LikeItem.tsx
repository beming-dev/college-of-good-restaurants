import { NextPage } from "next";
import Image from "next/image";
import { storeFromServer, storeType } from "./Map";
import _ from "lodash";
import { useEffect, useState } from "react";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { useSelector } from "react-redux";
import { rootState } from "../store/modules";
import { getJwtUsername, toStringByFormatting } from "../lib/util";

type propsType = {
  storeInfo: storeFromServer;
};

const LikeItem: NextPage<propsType> = ({ storeInfo }) => {
  const user = useSelector((store: rootState) => store.user);
  const [hearted, setHearted] = useState(true);
  const onHeartClick = () => {
    let url;
    let d;
    url = hearted
      ? `${process.env.NEXT_PUBLIC_SERVER_IP}/place-like/remove`
      : `${process.env.NEXT_PUBLIC_SERVER_IP}/place-like/add`;
    d = hearted
      ? {
          place_id: storeInfo.place_id,
          user_id: getJwtUsername(user.user),
        }
      : {
          place_id: storeInfo.place_id,
          user_id: getJwtUsername(user.user),
          like_date: toStringByFormatting(new Date()),
        };
    fetchWrapper
      .post(url, d)
      .then((data) => setHearted(!hearted))
      .catch((err) => console.log(err));
  };

  return (
    <div className="like-item">
      <span>이미지</span>
      <div className="store-info">
        <span className="name">{storeInfo.name}</span>
        <span className="address">{storeInfo.address}</span>
        <div className="rating-area">
          {_.range(storeInfo.rating).map((i) => (
            <div className="star-image-wrapper" key={i}>
              <Image src="/star-yellow.png" layout="fill" />
            </div>
          ))}
          {_.range(5 - storeInfo.rating).map((i) => (
            <div className="star-image-wrapper" key={i}>
              <Image src="/star.png" layout="fill" />
            </div>
          ))}
          <span>({storeInfo.review_count})</span>
        </div>
      </div>
      <div className="ex-func" onClick={onHeartClick}>
        {hearted ? (
          <Image src="/heart-red.png" width="30px" height="27px" />
        ) : (
          <Image src="/heart.png" width="30px" height="27px" />
        )}
      </div>
      <style jsx>
        {`
          .like-item {
            width: 60%;
            display: flex;
            border: 1px solid black;
            align-items: center;

            .store-info {
              display: flex;
              flex-direction: column;

              .rating-area {
                display: flex;

                .star-image-wrapper {
                  width: 20px;
                  height: 20px;
                  position: relative;
                }
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default LikeItem;
