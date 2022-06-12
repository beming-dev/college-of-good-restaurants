import Image from "next/image";

interface storeInfo {
  ["something"]: string;
}

//type 수정 필요
const RegisterItem = ({ storeInfo, order, selected, setSelected }: any) => {
  return (
    <div className="search-item" onClick={() => setSelected(order)}>
      <div className="store-image-wrapper"></div>
      <div className="introduce">
        <span className="store-name">{storeInfo.place_name}</span>
        <span className="address">{storeInfo.road_address_name}</span>
      </div>
      <style jsx>
        {`
          .search-item {
            width: 100%;
            height: 50px;
            padding: 0px 50px;
            border-top: 1px solid #f98600;
            border-bottom: 1px solid #f98600;
            transition-duration: 0.5s;
            background-color: ${selected === order ? "#f98600" : "white"};
            .introduce {
              display: flex;
              flex-direction: column;
            }
          }
          .search-item:hover {
            background-color: #f98600;
          }
        `}
      </style>
    </div>
  );
};

export default RegisterItem;