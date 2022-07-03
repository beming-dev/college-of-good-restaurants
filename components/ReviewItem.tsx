import { NextPage } from "next";
import Image from "next/image";

interface reviewType {
  rating: number;
  place_id: number;
  user_id: string;
  post_date: number;
  post_text: string;
  image_urls: string[];
}
interface propsType {
  review: reviewType;
}

const ReviewItem: NextPage<propsType> = ({ review }) => {
  return (
    <div className="review-item">
      <div className="content">
        <div className="container">
          <div className="user-img-wrapper">
            <Image src="/user.png" layout="fill" objectFit="contain" />
          </div>
          <div className="about-review">
            <div className="area">
              <span className="date">{review.post_date}</span>
              <div className="rate">{review.rating}</div>
            </div>
            <textarea readOnly className="description">
              {review.post_text}
            </textarea>
          </div>
        </div>
        {review.image_urls.map((url) => {})}
      </div>
      <style jsx>
        {`
          .review-item {
            width: calc(100% - 40px);
            padding: 0 20px;
            .content {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;

              .container {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }

              .user-img-wrapper {
                position: relative;
                width: 60px;
                height: 60px;
              }

              .about-review {
                width: 80%;
                display: flex;
                flex-direction: column;

                .area {
                  display: flex;
                }
                .description {
                  width: 100%;
                  height: 100px;
                  background-color: #eeeeee;
                  font-size: 15px;
                  resize: none;
                  outline: none;
                }
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default ReviewItem;
