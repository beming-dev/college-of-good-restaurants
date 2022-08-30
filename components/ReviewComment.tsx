import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { getJwtUsername } from "../lib/util";
import { rootState } from "../store/modules";
import { reviewType } from "./ReviewItem";

interface commentType {
  comment_date: string;
  comment_id: string;
  comment_text: string;
  review_id: string;
  user_id: string;
}
const ReviewComment = ({
  review,
  comment,
}: {
  review: reviewType;
  comment: commentType;
}) => {
  const router = useRouter();

  const user: any = useSelector((state: rootState) => state.user);

  const {
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ comment_des: string }>();

  const [edit, setEdit] = useState(false);

  const createDeleteData = () => {
    return {
      comment_id: comment.comment_id,
    };
  };

  const onCommentDelete = () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/comment/delete-comment`;
    fetchWrapper
      .post(url, createDeleteData(), user.user)
      .then((data: any) => {
        router.reload();
      })
      .catch((err: any) => {
        alert("삭제에 실패했습니다.");
      });
  };

  const createEditData = (data: any) => {
    return {
      comment_id: comment.comment_id,
      review_id: review.review.review_id,
      user_id: getJwtUsername(user.user),
      comment_text: data.comment_des,
    };
  };

  const onCommentEditComplete = (data: any) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/comment/update-comment`;
    fetchWrapper
      .post(url, createEditData(data), user.user)
      .then((data: any) => {
        router.reload();
        setEdit(false);
      })
      .catch((err: any) => alert("수정 실패"));
  };

  const onCommentEdit = () => {
    setEdit(true);
  };
  return (
    <div className="review-comment">
      <div className="comment-box">
        <span className="username">{comment.user_id}</span>
        <input
          readOnly={edit ? false : true}
          type="text"
          className="comment"
          defaultValue={comment.comment_text}
          {...register("comment_des")}
        />
      </div>

      {getJwtUsername(user.user) === review.review.user_id && !edit && (
        <div className="buttons">
          <button className="btn-delete" onClick={onCommentDelete}>
            삭제하기
          </button>
          <button className="btn-edit" onClick={onCommentEdit}>
            수정하기
          </button>
        </div>
      )}

      {edit && (
        <form
          className="buttons"
          onSubmit={handleSubmit(onCommentEditComplete)}
        >
          <button className="btn-delete">수정 등록</button>
        </form>
      )}

      <style jsx>{`
        .review-comment {
          width: 90%;
          align-self: end;
          .comment-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-top: 5px;

            .username {
              margin-right: 10px;
            }
            .comment {
              background-color: #eeeeee;
              width: 100%;
              font-size: 15px;
              outline: none;
              border: 0px;
            }
          }
          .buttons {
            display: flex;
            margin: 3px 0;
            justify-content: flex-end;

            button {
              background-color: rgba(0, 0, 0, 0);
              border: none;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewComment;
