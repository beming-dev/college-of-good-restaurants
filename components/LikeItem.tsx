import { NextPage } from "next";
import Image from "next/image";
import _ from "lodash";
import { useEffect, useState } from "react";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { useSelector } from "react-redux";
import { rootState } from "../store/modules";
import { getJwtUsername, toStringByFormatting } from "../lib/util";
import { useRouter } from "next/router";
import { serverStoreType } from "../lib/types";

type propsType = {
  storeInfo: serverStoreType;
};

const LikeItem: NextPage<propsType> = ({ storeInfo }) => {
  const router = useRouter();
  const user = useSelector((store: rootState) => store.user);
  const [hearted, setHearted] = useState(true);
  const onHeartClick = () => {
    const url = hearted
      ? `${process.env.NEXT_PUBLIC_SERVER_IP}/place-like/remove`
      : `${process.env.NEXT_PUBLIC_SERVER_IP}/place-like/add`;
    const d = hearted
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
      .then(() => setHearted(!hearted))
      .catch((err: any) => console.log(err));
  };

  const onItemClick = () => {
    router.push(`/store-detail?id=${storeInfo.place_id}`);
  };

  return (
    <div className="like-item" onClick={onItemClick}>
      <span className="img-wrapper">이미지</span>
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
          <Image src="/heart-red.png" layout="fill" />
        ) : (
          <Image src="/heart.png" layout="fill" />
        )}
      </div>
      <style jsx>
        {`
          .like-item:hover {
            background: #f98600;
            color: white;
          }
          .like-item {
            width: 60%;
            padding: 0 10px;
            display: flex;
            border: 1px solid #f98600;
            border-radius: 5px;
            justify-content: space-between;
            align-items: center;
            transition-duration: 0.5s;
            margin: 10px 0;

            .img-wrapper {
              width: 15%;
            }
            .store-info {
              width: 65%;
              display: flex;
              flex-direction: column;

              span,
              .rating-area {
                margin: 3px 0;
              }

              .rating-area {
                display: flex;

                .star-image-wrapper {
                  width: 20px;
                  height: 20px;
                  position: relative;
                }
              }
            }
            .ex-func {
              width: 30px;
              height: 27px;
              position: relative;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LikeItem;
