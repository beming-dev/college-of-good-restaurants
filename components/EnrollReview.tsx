import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../store/modules";
import { setEnrollReviewClose } from "../store/modules/close";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { getJwtUsername, toStringByFormatting } from "../lib/util";
import { commentType, serverStoreType } from "../lib/types";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";

const EnrollReview = ({ store }: { store: serverStoreType }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const close = useSelector((state: rootState) => state.close);
  const user = useSelector((state: rootState) => state.user);

  const [star, setStar] = useState(0);
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

  const uploadImg = async (callback: any) => {
    const urlArr: string[] = [];

    if (loadedImg.length >= 1) {
      await loadedImg.map((img, i) => {
        const resp = axios({
          method: "POST",
          url: "/api/uploadImg",
          data: { img: img.imagePreviewUrl },
        })
          .then(async (res) => {
            console.log(res);
            await urlArr.push(res.data);
            if (i + 1 === loadedImg.length) callback(urlArr);
          })
          .catch((err) => alert("이미지 업로드에 실패했습니다."));
      });
    } else {
      callback();
    }
  };

  const createReviewData = (data: commentType, urlArr: string[]) => {
    return {
      place_id: store.place_id,
      user_id: getJwtUsername(user.user),
      post_date: toStringByFormatting(new Date()),
      post_text: data.comment_text,
      rating: "4",
      image_urls: urlArr,
    };
  };

  const onEnrollReview = (data: commentType) => {
    uploadImg((urlArr: string[]) => {
      const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/review/add-review`;
      fetchWrapper
        .post(url, createReviewData(data, urlArr), user.user)
        .then(() => {
          dispatch(setEnrollReviewClose(true));
          router.reload();
        })
        .catch((err: any) => alert("리뷰 등록에 실패했습니다."));
    });
  };

  const onImgChange = (e: any) => {
    const reader = new FileReader();
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
            loadedImg.map(
              (img, i) =>
                img.imagePreviewUrl && (
                  <Image
                    src={img.imagePreviewUrl}
                    width="40px"
                    height="40px"
                    key={i}
                  />
                )
            )}
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
