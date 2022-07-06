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
        setLikeList(data);
      })
      .catch((err) => console.log(err));
  }, []);
};

export default Like;
