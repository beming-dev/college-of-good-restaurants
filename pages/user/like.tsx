import { useSelector } from "react-redux";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import { getJwtUsername } from "../../lib/util";
import { rootState } from "../../store/modules";
import { useEffect, useState } from "react";

interface likeType {
  place_id: number;
  user_id: string;
  like_data: number;
}

const Like = () => {
  const [likeList, setLikeList] = useState<likeType[]>([]);
  let user = useSelector((state: rootState) => state.user);
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place-like/user-like-list`;
    fetchWrapper
      .post(url, { user_id: getJwtUsername(user.user) })
      .then((data: any) => {
        console.log(data);
        setLikeList(data);
      })
      .catch((err) => {
        alert("좋아요 리스트 호출 과정에서 에러 발생");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="like">
      {likeList.map((store, i) => (
        <div key={i}></div>
      ))}
    </div>
  );
};

export default Like;
