import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../store/modules";
import { setEnrollReviewClose } from "../store/modules/close";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { getJwtUsername, toStringByFormatting } from "../lib/util";
import { commentServerType, commentType, serverStoreType } from "../lib/types";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface imgType {
  imagePreviewUrl: string | ArrayBuffer | null;
  fileName: any;
}

const EnrollReview = ({ store }: { store: serverStoreType }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  let close = useSelector((state: rootState) => state.close);
  let user = useSelector((state: rootState) => state.user);

  const [star, setStar] = useState(0);
  const [loadedImg, setLoadedImg] = useState<imgType[]>([]);

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
      place_id: store.place_id,
      user_id: getJwtUsername(user.user),
      post_date: toStringByFormatting(new Date()),
      post_text: data.comment_text,
      rating: "4",
      image_urls: ["이미지1", "이미지2"],
    };
  };

  const onEnrollReview = (data: commentType) => {
    console.log(data);
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/review/add-review`;
    fetchWrapper
      .post(url, createReviewData(data), user.user)
      .then((data: any) => {
        dispatch(setEnrollReviewClose(true));
        router.reload();
      })
      .catch((err: any) => alert("리뷰 등록에 실패했습니다."));
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
      <form className="content" onSubmit={handleSubmit(onEnrollReview)}>
        <span>리뷰등록</span>
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
        />
        <button className="btn-enroll">등록</button>
        <div
          className="btn-close"
          onClick={() => dispatch(setEnrollReviewClose(true))}
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
          display: ${close.enrollReviewClose ? "none" : "flex"};
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

export default EnrollReview;
