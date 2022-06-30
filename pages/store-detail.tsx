import { NextPage } from "next";
import { storeFromServer } from "../components/Map";
import { fetchWrapper } from "../helpers/fetch-wrapper";

interface reviewType {
  rating: number;
  place_id: number;
  user_id: string;
  post_date: number;
  post_text: string;
  image_urls: string[];
}
interface propsType {
  storeInfo: storeFromServer;
  reviewInfo: reviewType;
}

const storeDetail: NextPage<propsType> = ({ storeInfo }) => {
  console.log(storeInfo);
  return (
    <div className="store-detail">
      <div className="content">
        <div className="main">
          <h1 className="store-name">{storeInfo.name}</h1>
          <div className="rate-review">
            <span className="rate">평점 4.5</span>
            <span className="review">리뷰 39</span>
          </div>
        </div>
        <div className="detail">
          <h2>상세정보</h2>
          <span className="address">{storeInfo.address}</span>
          <span className="phone">{storeInfo.phone || "00-0000-0000"}</span>
        </div>
        <div className="review">
          <span>리뷰</span>
        </div>
      </div>
      <style jsx>{`
        .store-detail {
          display: flex;
          align-items: center;
          justify-content: center;

          .content {
            width: 800px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid #ebebeb;

            .main {
              display: flex;
              flex-direction: column;
              align-items: center;
              border-bottom: 1px solid gray;

              .store-name {
                font-size: 40px;
                font-weight: bold;
                margin: 10px 0;
              }

              .rate-review {
                display: flex;
                margin: 10px 0;
                span {
                  margin: 0 10px;
                }
              }
            }
            .detail {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: start;
              h2 {
                font-size: 20px;
                font-weight: bold;
                margin: 10px 0px;
              }
              span {
                margin: 5px 0px;
              }
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

export async function getServerSideProps(ctx: any) {
  const url01 = `${process.env.NEXT_PUBLIC_SERVER_IP}/place/get-place`;
  let resp01;
  await fetchWrapper.post(url01, { place_id: ctx.query.id }).then((data) => {
    resp01 = data;
  });

  const url02 = `${process.env.NEXT_PUBLIC_SERVER_IP}/review/get-reviews`;
  let resp02: any = 1;
  await fetchWrapper
    .post(url02, { place_id: parseInt(ctx.query.id) })
    .then((data) => {
      resp02 = data;
    })
    .catch((err) => console.log(err));

  return { props: { storeInfo: resp01, reviewInfo: resp02 } };
}

export default storeDetail;
