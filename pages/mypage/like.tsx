import { useSelector } from "react-redux";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import { getJwtUsername } from "../../lib/util";
import { rootState } from "../../store/modules";
import { useEffect, useState } from "react";
import LikeItem from "../../components/LikeItem";
import MypageNav from "../../components/MypageNav";
import { serverStoreType } from "../../lib/types";

interface likeType {
  like_data: {
    place_id: number;
    user_id: string;
    like_data: number;
  };
  place_data: serverStoreType;
}

const Like = () => {
  const user = useSelector((state: rootState) => state.user);

  const [likeList, setLikeList] = useState<likeType[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place-like/user-like-list`;
    fetchWrapper
      .post(url, {
        user_id: getJwtUsername(user.user),
        scope_start: 10 * (page - 1) + 1 + "",
        scope_end: 10 * page + "",
      })
      .then((data: any) => {
        setLikeList([...likeList, ...data]);
      })
      .catch(() => {
        alert("좋아요 리스트 호출 과정에서 에러 발생");
      });
  }, [page]);

  const onMoreClick = () => {
    if (likeList.length === 10 * page) setPage(page + 1);
  };

  return (
    <div className="like-page">
      <MypageNav />
      <div className="container">
        <div className="item-box">
          {likeList.map((store, i) => (
            <LikeItem
              storeInfo={store.place_data}
              key={store.place_data.place_id}
            />
          ))}
          <button className="btn-more" onClick={onMoreClick}>
            더 보기
          </button>
        </div>
      </div>
      <style jsx>
        {`
          .like-page {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;

            .container {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
              height: 100%;

              .item-box {
                width: 100%;
                display: flex;
                flex-direction: column;
                margin: 150px 0;
                justify-content: center;
                align-items: center;
              }
              .btn-more {
                width: 150px;
                height: 50px;
                background: white;
                color: #e8630a;
                margin-top: 30px;
                border: 1px solid #e8630a;
                border-radius: 10px;
                transition-duration: 0.5s;
                margin-bottom: 50px;
              }

              .btn-more:hover {
                background: #e8630a;
                color: white;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default Like;
