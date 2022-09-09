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
  const [page, setPage] = useState(1);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place/get-place-by-user-id`;
    fetchWrapper
      .post(url, {
        user_id: getJwtUsername(user.user),
        scope_start: 10 * (page - 1) + 1 + "",
        scope_end: page * 10,
      })
      .then((data: any) => {
        let arr = [...storeList, ...data];
        setStoreList(arr);
      });
  }, [page]);

  const onMoreClick = () => {
    if (storeList.length === page * 10) setPage(page + 1);
  };

  return (
    <div className="store">
      <MypageNav />
      <div className="container">
        <div className="store-box">
          {storeList.map((store: serverStoreType) => (
            <div className="store-item" key={store.place_id}>
              <SearchItem item={store} typ="mypage" />
            </div>
          ))}

          <button className="btn-more" onClick={onMoreClick}>
            더보기
          </button>
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
              height: 100%;

              .store-box {
                display: flex;
                flex-direction: column;
                margin: 150px 0;
                width: 700px;
                cursor: pointer;

                .store-item {
                  margin: 5px 0;
                  border-radius: 5px;
                  padding: 0 50px;
                }
                .btn-more {
                  width: 100px;
                  min-height: 50px;
                  background-color: white;
                  border: 1px solid #f98600;
                  border-radius: 5px;
                  font-size: 17px;
                  transition-duration: 0.5s;
                  align-self: center;
                  margin: 50px 0;
                }
                .btn-more:hover {
                  color: white;
                  background-color: #f98600;
                }
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
