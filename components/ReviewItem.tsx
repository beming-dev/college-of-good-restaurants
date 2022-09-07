import _ from "lodash";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { commentType, reviewType, signupFormType } from "../lib/types";
import { getJwtUsername } from "../lib/util";
import { rootState } from "../store/modules";
import { setUpdateReviewClose } from "../store/modules/close";
import ErrorBoundary from "./ErrorBoundary";
import ReviewComment from "./ReviewComment";
import UpdateReview from "./UpdateReview";

interface formType {
  comment_des: string;
}
interface propsType {
  review: reviewType;
}

const ReviewItem: NextPage<propsType> = ({ review }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formType>();

  const user: any = useSelector((state: rootState) => state.user);

  const onReviewDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/review/delete-review`;
      fetchWrapper
        .post(url, { review_id: review.review.review_id }, user.user)
        .then(() => {
          alert("리뷰를 삭제했습니다.");
          router.reload();
        })
        .catch(() => alert("리뷰 삭제에 실패했습니다."));
    }
  };
  const onReviewEdit = () => {
    dispatch(setUpdateReviewClose(false));
  };

  const createEnrollData = (data: formType) => {
    return {
      review_id: review.review.review_id,
      user_id: getJwtUsername(user.user),
      comment_text: data.comment_des,
    };
  };
  const onEnrollComment = (data: formType) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/comment/add-comment`;
    if (data.comment_des.length >= 5) {
      fetchWrapper
        .post(url, createEnrollData(data))
        .then(() => router.reload())
        .catch(() => alert("댓글 등록에 실패했습니다."));
    } else {
      alert("5자 이상 내용을 입력해주세요.");
    }
  };

  return (
    <div className="review-item">
      <div className="content">
        <div className="container">
          <div className="about-review">
            <div className="area">
              <div className="top">
                <span className="username">{review.review.user_id}</span>
                <span className="date">
                  {
                    new Date(review.review.post_date)
                      .toISOString()
                      .split("T")[0]
                  }
                </span>
              </div>
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

              <div className="img-box">
                {review.review.image_urls.map((imgUrl, i) => (
                  <ErrorBoundary key={i}>
                    <div className="img-wrapper">
                      <Image src={imgUrl} layout="fill" objectFit="contain" />
                    </div>
                  </ErrorBoundary>
                ))}
              </div>
            </div>
            <textarea
              readOnly
              className="description"
              value={review.review.post_text || ""}
            ></textarea>
            {getJwtUsername(user.user) === review.review.user_id && (
              <div className="buttons">
                <button className="btn-delete" onClick={onReviewDelete}>
                  삭제하기
                </button>
                <button className="btn-edit" onClick={onReviewEdit}>
                  수정하기
                </button>
              </div>
            )}
          </div>
        </div>
        {review.comments.map((comment: commentType, i: number) => (
          <ReviewComment
            comment={comment}
            review={review}
            key={i}
          ></ReviewComment>
        ))}

        <form
          className="review-comment-feild"
          onSubmit={handleSubmit(onEnrollComment)}
        >
          <textarea
            placeholder="리뷰의 댓글을 입력하세요."
            maxLength={60}
            id=""
            rows={2}
            {...register("comment_des")}
          ></textarea>
          <button>등록</button>
        </form>
      </div>
      <UpdateReview review={review} />
      <style jsx>
        {`
          .review-item {
            width: calc(100% - 20px);
            border-bottom: 1px solid black;
            padding: 10px;
            margin-bottom: 10px;
            .content {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: space-between;

              .container {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }

              .about-review {
                width: 100%;
                display: flex;
                flex-direction: column;

                .area {
                  width: 100%;
                  display: flex;
                  flex-direction: column;

                  .top {
                    display: flex;
                    align-items: center;

                    .username {
                      font-size: 17px;
                      margin-right: 10px;
                    }
                    .date {
                      color: #666666;
                      font-size: 13px;
                    }
                  }

                  .rate {
                    display: flex;
                    margin: 7px 0;
                    .star-img-wrapper {
                      position: relative;
                      width: 20px;
                      height: 20px;
                      margin-right: 2px;
                    }
                  }

                  .img-box {
                    display: flex;
                    .img-wrapper {
                      position: relative;
                      width: 100px;
                      height: 100px;
                      margin-bottom: 5px;
                      margin-right: 10px;
                    }
                  }
                }
                .description {
                  width: 100%;
                  height: 70px;
                  background-color: #eeeeee;
                  font-size: 15px;
                  resize: none;
                  outline: none;
                  border: 0px;
                  margin-top: 5px;
                }

                .buttons {
                  margin: 3px 0;
                  align-self: end;

                  button {
                    background-color: rgba(0, 0, 0, 0);
                    border: none;
                  }
                }
              }
              .review-comment-feild {
                width: 90%;
                align-self: end;
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                textarea {
                  width: 90%;
                  background-color: #eeeeee;
                  border: 0px;
                  outline: none;
                  resize: none;
                }
                button {
                  width: 50px;
                  margin-left: 5px;
                  border: 1px solid #eeeeee;
                  background: none;
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
