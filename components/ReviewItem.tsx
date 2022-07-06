import _ from "lodash";
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
              <span className="date">
                {new Date(review.post_date).toISOString().split("T")[0]}
              </span>
              <div className="rate">
                {_.range(review.rating).map((_, i) => (
                  <div className="star-img-wrapper" key={i}>
                    <Image
                      src="/star-yellow.png"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                ))}
                {_.range(5 - review.rating).map((_, i) => (
                  <div className="star-img-wrapper" key={i}>
                    <Image src="/star.png" layout="fill" objectFit="contain" />
                  </div>
                ))}
              </div>
            </div>
            <textarea
              readOnly
              className="description"
              value={review.post_text || ""}
            ></textarea>
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
                  flex-direction: column;

                  .rate {
                    margin: 5px 0;
                    display: flex;
                    .star-img-wrapper {
                      position: relative;
                      width: 20px;
                      height: 20px;
                      margin-right: 2px;
                    }
                  }
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
