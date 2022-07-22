import { useSelector } from "react-redux";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import { getJwtUsername } from "../../lib/util";
import { rootState } from "../../store/modules";
import { useEffect, useState } from "react";
import LikeItem from "../../components/LikeItem";
import { storeFromServer } from "../../components/Map";

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
  let user = useSelector((state: rootState) => state.user);
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place-like/user-like-list`;
    fetchWrapper
      .post(url, {
        user_id: getJwtUsername(user.user),
        scope_start: "1",
        scope_end: "10",
      })
      .then((data: any) => {
        setLikeList(data);
      })
      .catch((err) => {
        alert("좋아요 리스트 호출 과정에서 에러 발생");
        console.log(err);
      });
  }, []);

  return (
    <div className="like-page">
      {likeList.map((store, i) => (
        <LikeItem
          storeInfo={store.place_data}
          key={store.place_data.place_id}
        />
      ))}
      <style jsx>
        {`
          .like-page {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};

export default Like;
