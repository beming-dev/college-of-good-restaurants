import _ from "lodash";
import { NextPage } from "next";
import Image from "next/image";

export interface reviewType {
  comments: any;
  review: {
    image_urls: string[];
    place_id: number;
    post_date: string;
    post_text: string;
    rating: number;
    review_id: number;
    user_id: string;
  };
}
interface propsType {
  review: reviewType;
}

const ReviewItem: NextPage<propsType> = ({ review }) => {
  console.log(review);
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
                {new Date(review.review.post_date).toISOString().split("T")[0]}
              </span>
              <div className="rate">
                {_.range(review.review.rating).map((_, i) => (
                  <div className="star-img-wrapper" key={i}>
                    <Image
                      src="/star-yellow.png"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                ))}
                {_.range(5 - review.review.rating).map((_, i) => (
                  <div className="star-img-wrapper" key={i}>
                    <Image src="/star.png" layout="fill" objectFit="contain" />
                  </div>
                ))}
              </div>
            </div>
            <textarea
              readOnly
              className="description"
              value={review.review.post_text || ""}
            ></textarea>
          </div>
        </div>
        {/* {review.review.image_urls.map((url) => (
          <Image src={url} width="30px" height="30px" />
        ))} */}
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
