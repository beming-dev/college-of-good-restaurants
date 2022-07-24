import { useEffect, useState } from "react";
import MypageNav from "../../components/MypageNav";
import ReviewItem, { reviewType } from "../../components/ReviewItem";
import { fetchWrapper } from "../../helpers/fetch-wrapper";

const review = () => {
  const [reviewList, setReviewList] = useState<reviewType[]>([]);
  useEffect(() => {
    // const url = `${process.env.NEXT_PUBLIC_SERVER_IP}`;
    // fetchWrapper.post(url, {}).then((result: any) => {
    //   setReviewList(result);
    // });
  }, []);
  return (
    <div className="review">
      <MypageNav />
      <div className="container">
        {reviewList.map((review) => (
          <ReviewItem review={review} />
        ))}
      </div>
      <style jsx>
        {`
          .review {
            .container {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
          }
        `}
      </style>
    </div>
  );
};

export default review;
