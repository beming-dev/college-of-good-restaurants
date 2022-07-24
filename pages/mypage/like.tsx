import { useSelector } from "react-redux";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import { getJwtUsername } from "../../lib/util";
import { rootState } from "../../store/modules";
import { useEffect, useState } from "react";
import LikeItem from "../../components/LikeItem";
import { storeFromServer } from "../../components/Map";
import MypageNav from "../../components/MypageNav";

interface likeType {
  like_data: {
    place_id: number;
    user_id: string;
    like_data: number;
  };
  place_data: storeFromServer;
}

const Like = () => {
  const [likeList, setLikeList] = useState<likeType[]>([]);
  const [page, setPage] = useState(1);

  const onMoreClick = () => {
    if (likeList.length === 10 * page) setPage(page + 1);
  };

  let user = useSelector((state: rootState) => state.user);
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
      .catch((err) => {
        alert("좋아요 리스트 호출 과정에서 에러 발생");
        console.log(err);
      });
  }, [page]);

  return (
    <div className="like-page">
      <MypageNav />
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
      <style jsx>
        {`
          .like-page {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;

            .item-box {
              width: 100%;
              display: flex;
              flex-direction: column;
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
            }

            .btn-more:hover {
              background: #e8630a;
              color: white;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Like;
