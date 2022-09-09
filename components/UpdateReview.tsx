import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../store/modules";
import {
  setEnrollReviewClose,
  setUpdateReviewClose,
} from "../store/modules/close";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { commentType, reviewType } from "../lib/types";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import _ from "lodash";

const UpdateReview = ({ review }: { review: reviewType }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  let user = useSelector((state: rootState) => state.user);
  let close = useSelector((state: rootState) => state.close);

  const [star, setStar] = useState(
    review.review.rating ? review.review.rating : 0
  );
  const [loadedImg, setLoadedImg] = useState<any[]>([]);

  const schema = yup.object().shape({
    comment_text: yup.string().required("comment is required"),
  });
  const {
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<commentType>({
    resolver: yupResolver(schema),
  });

  const createReviewData = (data: commentType) => {
    return {
      review_id: review.review.review_id,
      post_text: data.comment_text,
      rating: star,
      image_urls: [],
    };
  };

  const onUpdateReview = (data: commentType) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/review/update-review`;
    fetchWrapper
      .post(url, createReviewData(data), user.user)
      .then((data: any) => {
        dispatch(setUpdateReviewClose(true));
        router.reload();
      })
      .catch((err: any) => alert("리뷰 수정에 실패했습니다."));
  };

  const onImgChange = (e: any) => {
    let reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLoadedImg([
          ...loadedImg,
          { imagePreviewUrl: reader.result, fileName: file.name },
        ]);
      };
    }
  };

  return (
    <div className="enroll-review-box">
      <form className="content" onSubmit={handleSubmit(onUpdateReview)}>
        <span>리뷰수정</span>
        <div className="rate">
          {_.range(star).map((v) => (
            <div
              className="star-img-wrapper"
              onClick={() => setStar(v + 1)}
              key={v}
            >
              <Image src="/star-yellow.png" width="30px" height="30px" />
            </div>
          ))}
          {_.range(star, 5).map((v) => (
            <div
              className="star-img-wrapper"
              onClick={() => setStar(v + 1)}
              key={v}
            >
              <Image src="/star.png" width="30px" height="30px" />
            </div>
          ))}
        </div>

        <div className="img-upload">
          <input
            type="file"
            name="chooseFile"
            accept="image/*"
            onChange={onImgChange}
            multiple
          />
          {loadedImg.length >= 1 &&
            loadedImg.map((img, i) => (
              <Image
                src={img.imagePreviewUrl}
                width="40px"
                height="40px"
                key={i}
              />
            ))}
        </div>
        <input
          type="text"
          className="description"
          {...register("comment_text")}
          defaultValue={review.review.post_text}
        />
        <button className="btn-enroll">수정</button>
        <div
          className="btn-close"
          onClick={() => dispatch(setUpdateReviewClose(true))}
        >
          X
        </div>
      </form>
      <style jsx>{`
        .enroll-review-box {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.3);
          display: ${close.updateReviewClose ? "none" : "flex"};
          justify-content: center;
          align-items: center;
          .content {
            width: 500px;
            height: 500px;
            background-color: white;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            position: relative;

            .rate {
              display: flex;

              .star-img-wrapper {
                margin-right: 5px;
                cursor: pointer;
              }
            }

            .img-upload {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            span {
              font-size: 20px;
            }
            .description {
              width: 80%;
              height: 40%;
              border: 1px solid #f98600;
            }

            .btn-enroll {
              width: 100px;
              height: 50px;
              background-color: white;
              border: 1px solid #f98600;
              border-radius: 5px;
            }

            .btn-close {
              width: 30px;
              height: 30px;
              border-radius: 30px;
              border: none;
              position: absolute;
              top: 10px;
              right: 10px;
              cursor: pointer;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default UpdateReview;
