import Image from "next/image";

const SearchItem = ({ item }: any) => {
  return (
    <div className="search-item">
      <div className="txt-area">
        <span className="title">{item.place_name}</span>
        <div className="review-area">
          <span className="txt-rate">4.1</span>
          <div className="img-rate"></div>
          <span className="review-num">(11)</span>
        </div>
        <span className="address">{item.road_address_name}</span>
      </div>
      <Image src="/test.jpg" width="50px" height="50px" />

      <style jsx>
        {`
          .search-item {
            margin: 10px 0;
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .txt-area {
              display: flex;
              flex-direction: column;

              .review-area {
                display: flex;
                align-items: center;
              }
            }
          }

          @media (max-width: 780px) {
            .search-item {
              width: 90%;
            }
          }
          @media (max-width: 480px) {
          }
        `}
      </style>
    </div>
  );
};

export default SearchItem;
