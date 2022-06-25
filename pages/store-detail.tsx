import { NextPage } from "next";
import { storeFromServer } from "../components/Map";
import { fetchWrapper } from "../helpers/fetch-wrapper";

interface propsType {
  storeInfo: storeFromServer;
}

const storeDetail: NextPage<propsType> = ({ storeInfo }) => {
  return (
    <div className="store-detail">
      <div className="content">
        <div className="main">
          <span className="storeName">{storeInfo.name}</span>
          <div className="rate-review">
            <span className="rate">평점 4.5</span>
            <span className="review">리뷰 39</span>
          </div>
        </div>
        <div className="detail">
          <span>상세정보</span>
          <span className="address">{storeInfo.address}</span>
          <span className="phone">{storeInfo.phone}</span>
        </div>
        <div className="review">
          <span>리뷰</span>
        </div>
      </div>
      <style jsx>{`
        .store-detail {
          .content {
            width: 800px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .main {
              display: flex;
              flex-direction: column;
            }
            .detail {
              display: flex;
              flex-direction: column;
            }
            .review {
              display: flex;
              flex-direction: column;
            }
          }
        }
      `}</style>
    </div>
  );
};

export function getServerSideProps(ctx: any) {
  const url = `${process.env.NEXT_PUBLIC_SERVER_IP}`;
  const resp = fetchWrapper.post(url, { data: ctx.query.id });
  return resp;
}

export default storeDetail;
