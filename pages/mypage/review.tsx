import { useEffect, useState } from "react";
import MypageNav from "../../components/MypageNav";
import ReviewItem, { reviewType } from "../../components/ReviewItem";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import { useSelector } from "react-redux";
import { rootState } from "../../store/modules";
import { getJwtUsername } from "../../lib/util";

const review = () => {
  const user = useSelector((state: rootState) => state.user);

  const [reviewList, setReviewList] = useState<reviewType[]>([]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/review/get-review-by-user-id`;
    fetchWrapper
      .post(url, {
        user_id: getJwtUsername(user.user),
        scope_start: "1",
        scope_end: "10",
      })
      .then((result: any) => {
        setReviewList(result);
      });
  }, []);

  return (
    <div className="review">
      <MypageNav />
      <div className="container">
        <div className="review-box">
          {reviewList.map((review, i) => (
            <ReviewItem review={review} key={i} />
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .review {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            .container {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;

              .review-box {
                width: 700px;
              }
            }
          }
          @media (max-width: 900px) {
            .review {
              .container {
                .review-box {
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

export default review;
