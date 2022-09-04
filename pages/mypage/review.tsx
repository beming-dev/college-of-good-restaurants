import { useEffect, useState } from "react";
import MypageNav from "../../components/MypageNav";
import ReviewItem from "../../components/ReviewItem";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import { useSelector } from "react-redux";
import { rootState } from "../../store/modules";
import { getJwtUsername } from "../../lib/util";
import { reviewType } from "../../lib/types";

const review = () => {
  const user = useSelector((state: rootState) => state.user);

  const [reviewList, setReviewList] = useState<reviewType[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/review/get-review-by-user-id`;
    fetchWrapper
      .post(url, {
        user_id: getJwtUsername(user.user),
        scope_start: "1",
        scope_end: page * 10,
      })
      .then((result: any) => {
        setReviewList(result);
      });
  }, [page]);

  const onMoreClick = () => {
    if (reviewList.length === page * 10) setPage(page + 1);
  };

  return (
    <div className="review">
      <MypageNav />
      <div className="container">
        <div className="review-box">
          {reviewList.map((review, i) => (
            <ReviewItem review={review} key={i} />
          ))}
        </div>

        <button className="btn-more" onClick={onMoreClick}>
          더보기
        </button>
        <div className="empty"></div>
      </div>
      <style jsx>
        {`
          .review {
            width: 100%;
            height: 100vh;
            display: flex;
            overflow-x: hidden;
            justify-content: center;
            align-items: center;
            .container {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
              height: 100%;

              .review-box {
                margin: 150px 0;
                width: 700px;
              }

              .btn-more {
                width: 100px;
                min-height: 50px;
                background-color: white;
                border: 1px solid #f98600;
                border-radius: 5px;
                font-size: 17px;
                transition-duration: 0.5s;
              }
              .btn-more:hover {
                color: white;
                background-color: #f98600;
              }

              .empty {
                width: 100%;
                min-height: 50px;
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
