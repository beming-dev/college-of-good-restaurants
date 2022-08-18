import { useEffect, useState } from "react";
import MypageNav from "../../components/MypageNav";
import SearchItem from "../../components/SearchItem";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import { useSelector } from "react-redux";
import { rootState } from "../../store/modules";
import { getJwtUsername } from "../../lib/util";
import { serverStoreType } from "../../lib/types";

const store = () => {
  const user = useSelector((state: rootState) => state.user);

  const [storeList, setStoreList] = useState<serverStoreType[]>([]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place/get-place-by-user-id`;
    fetchWrapper
      .post(url, {
        user_id: getJwtUsername(user.user),
        scope_start: "1",
        scope_end: "2",
      })
      .then((data: any) => {
        setStoreList(data);
      });
  }, []);

  return (
    <div className="store">
      <MypageNav />
      <div className="container">
        <div className="store-box">
          {storeList.map((store: serverStoreType) => (
            <SearchItem item={store} key={store.place_id} />
          ))}
        </div>
      </div>

      <style jsx>
        {`
          .store {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;

            .container {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;

              .store-box {
                width: 700px;
              }
            }
          }
          @media (max-width: 900px) {
            .store {
              .container {
                .store-box {
                  width: 500px;
                }
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default store;
