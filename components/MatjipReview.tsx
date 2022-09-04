import { fetchWrapper } from "../helpers/fetch-wrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import _ from "lodash";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { getJwtUsername, toStringByFormatting } from "../lib/util";
import axios from "axios";
import { NextPage } from "next";
import type { rootState } from "../store/modules";
import { setRegisterClose } from "../store/modules/close";

interface formType {
  reviewDes: string;
  star: number;
  imgUrl: string;
}

interface imgType {
  imagePreviewUrl: string | ArrayBuffer | null;
  fileName: any;
}

const MatjipReview: NextPage<any> = ({ pageConvert, setPageConvert }) => {
  const dispatch = useDispatch();
  let user = useSelector((state: rootState) => state.user);
  const selectedSearchResult = useSelector(
    (state: rootState) => state.selected
  ).selectedSearchResult;

  const [star, setStar] = useState(0);
  const [registering, setRegistering] = useState(false);
  const [loadedImg, setLoadedImg] = useState<imgType[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const createReviewData = (
    data: formType,
    img_urls: string[],
    place_id: string
  ) => {
    return {
      image_urls: img_urls,
      place_id,
      user_id: getJwtUsername(user.user),
      post_date: toStringByFormatting(new Date()),
      post_text: data.reviewDes,
      rating: star + "",
    };
  };

  const createPlaceData = () => {
    return {
      category_name: selectedSearchResult.category_name,
      kakao_id: selectedSearchResult.id,
      phone: selectedSearchResult.phone,
      place_name: selectedSearchResult.place_name,
      place_url: selectedSearchResult.place_url,
      road_address_name: selectedSearchResult.road_address_name,
      x: selectedSearchResult.x,
      y: selectedSearchResult.y,
      image_url: "~~",
      user_id: getJwtUsername(user.user),
    };
  };

  const onEnrollStore = async (data: any) => {
    if (registering) return;

    if (!user.user) {
      alert("로그인 후 이용해주세요");
      return;
    }

    if (data.reviewDes == "") {
      alert("내용을 입력해주세요.");
      return;
    }
    if (star == 0) {
      alert("별점을 입력해주세요");
      return;
    }

    setRegistering(true);

    uploadImg(data);
  };

  const uploadImg = async (data: any) => {
    let urlArr: string[] = [];

    if (loadedImg.length >= 1) {
      await loadedImg.map((img, i) => {
        const resp = axios({
          method: "POST",
          url: "/api/uploadImg",
          data: { img: img.imagePreviewUrl },
        })
          .then(async (res) => {
            await urlArr.push(res.data);
            if (i + 1 == loadedImg.length) {
              enrollPlace(data, urlArr);
            }
          })
          .catch((err) => alert("이미지 업로드에 실패했습니다."));
      });
    } else {
      enrollPlace(data, urlArr);
    }
  };

  const enrollPlace = async (data: formType, urlArr: string[]) => {
    await fetchWrapper
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/place/add-place`,
        createPlaceData(),
        user.user
      )
      .then(async (res: any) => {
        enrollReview(data, urlArr, res);
      })
      .catch((err) => {
        if (err === "해당 가게가 이미 존재합니다.")
          alert("이미 존재하는 가게입니다. 리뷰 등록이 완료되었습니다.");
        setRegistering(false);
        return;
      });
  };

  const enrollReview = async (data: formType, urlArr: string[], res: any) => {
    await fetchWrapper
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/review/add-review`,
        createReviewData(data, urlArr, res.place_id),
        user.user
      )
      .then(() => {
        window.alert("등록이 완료되었습니다.");
        setPageConvert(false);
        dispatch(setRegisterClose(true));
        setRegistering(false);
        setStar(0);
      })
      .catch((err) => {
        console.log(err);
        alert("리뷰 등록에 실패하였습니다.");
        setRegistering(false);
        return;
      });
  };

  const onConvert = (dir: number) => {
    if (dir === 1 && selectedSearchResult) {
      setPageConvert(true);
    } else {
      setPageConvert(false);
    }
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
    <form className="matjip-review" onSubmit={handleSubmit(onEnrollStore)}>
      <div className="storeInfo">
        <div className="introduce">
          <span className="store-name">
            {selectedSearchResult && selectedSearchResult.place_name}
          </span>
          <span className="address">
            {selectedSearchResult && selectedSearchResult.road_address_name}
          </span>
        </div>
      </div>
      <div className="img-upload">
        <input
          type="file"
          name="chooseFile"
          accept="image/*"
          onChange={onImgChange}
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
      <input
        type="text"
        autoComplete="off"
        className="des-review"
        {...register("reviewDes")}
      ></input>
      <div className="buttons">
        <button type="button" onClick={() => onConvert(-1)}>
          뒤로
        </button>
        <input type="submit" />
      </div>
      <style jsx>
        {`
          .matjip-review {
            position: relative;
            top: 0;
            transition-duration: 1s;
            left: ${pageConvert ? -100 : 0}%;
            min-width: 100%;
            height: 100%;
            background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;

            .storeInfo {
              .introduce {
                display: flex;
                flex-direction: column;
              }
            }

            .img-upload {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .rate {
              display: flex;

              .star-img-wrapper {
                margin: 0 10px;
              }
              .star-img-wrapper:hover {
                cursor: pointer;
              }
            }

            .storeInfo {
              display: flex;
              flex-direction: column;
            }

            .des-review {
              width: 600px;
              height: 200px;
              background-color: #cccccc;
              border: 1px solid grey;
            }

            .buttons {
              width: 60%;
              display: flex;
              justify-content: space-between;
              button,
              input {
                width: 80px;
                height: 40px;
              }
            }
          }

          @media (max-width: 930px) {
            .matjip-review {
              min-width: 100%;
              height: 100%;
              background: white;

              .storeInfo {
                .introduce {
                  display: flex;
                  flex-direction: column;
                }
              }

              .img-upload {
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }

          @media (max-width: 780px) {
            .matjip-review {
              min-width: 100%;
              height: 100%;
              background: white;

              .des-review {
                width: 400px;
                height: 150px;
                background-color: #cccccc;
                border: 1px solid grey;
              }
            }
          }

          @media (max-width: 550px) {
            .matjip-review {
              min-width: 100%;
              height: 100%;
              background: white;

              .des-review {
                width: 90%;
                height: 150px;
                background-color: #cccccc;
                border: 1px solid grey;
              }
            }
          }
        `}
      </style>
    </form>
  );
};

export default MatjipReview;
