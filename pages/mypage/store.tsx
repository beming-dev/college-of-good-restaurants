import { useEffect, useState } from "react";
import { storeFromServer } from "../../components/Map";
import MypageNav from "../../components/MypageNav";
import SearchItem from "../../components/SearchItem";
import { fetchWrapper } from "../../helpers/fetch-wrapper";

const store = () => {
  const [storeList, setStoreList] = useState<storeFromServer[]>([]);
  useEffect(() => {
    // const url = `${process.env.NEXT_PUBLIC_SERVER_IP}`;
    // fetchWrapper.post(url, {}).then((data) => {
    //   setStoreList(data);
    // });
  }, []);
  return (
    <div className="store">
      <MypageNav />
      <div className="container">
        {storeList.map((store: storeFromServer) => (
          <SearchItem item={store} />
        ))}
      </div>
    </div>
  );
};

export default store;
