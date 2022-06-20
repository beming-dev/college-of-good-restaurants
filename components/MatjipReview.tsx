import { fetchWrapper } from "../helpers/fetch-wrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import _ from "lodash";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getJwtUsername, toStringByFormatting } from "../lib/util";
import axios from "axios";

const MatjipReview = (props: any) => {
  const {
    searchResult,
    setSearchResult,
    selected,
    setSelected,
    pageConvert,
    setPageConvert,
    setRegisterClose,
    star,
    setStar,
  } = props;

  const [loadedImg, setLoadedImg] = useState<any>({
    imagePreviewUrl: "",
    imageBlob: null,
  });

  let user = useSelector((state: any) => state.user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const createReviewData = (data: any) => {
    return {
      "place-id": searchResult[selected].place_id,
      "user-id": getJwtUsername(user.user),
      "post-date": toStringByFormatting(Date.now()),
      "post-text": data.reviewDes,
      rating: star,
    };
  };

  // const getImageFromKakao = async () => {
  //   if (searchResult[selected]) {
  //     const url = `/api/kakaomap/?id=${searchResult[selected].id}`;
  //     const resp = await axios({
  //       method: "POST",
  //       url: url,
  //       withCredentials: true,
  //     });
  //     const $ = cheerio.load(resp.data);
  //     const elements = $("#kakaoIndex");
  //     elements.each((idx: any, el: any) => {
  //       // ❺ text() 메서드를 사용하기 위해 Node 객체인 el을 $로 감싸서 cheerio 객체로 변환
  //     });
  //   }
  // };

  // getImageFromKakao();

  const onEnrollReview = async (data: any) => {
    const resp = await axios({
      method: "POST",
      url: "/api/uploadImg",
      withCredentials: true,
      data: { img: loadedImg.imagePreviewUrl },
    }).then((data) => console.log(data));

    if (!user.user) {
      alert("로그인 후 이용해주세요");
    } else {
      try {
        await fetchWrapper.post(
          `${process.env.NEXT_PUBLIC_SERVER_IP}/add-review`,
          createReviewData(data)
        );
      } catch (err) {
        console.log(err);
      }
      window.alert("등록이 완료되었습니다.");
      setSearchResult([]);
      setSelected(0);
      setPageConvert(false);
      setRegisterClose(true);
    }
  };

  const onConvert = (dir: number) => {
    if (dir === 1 && searchResult.length !== 0) {
      setPageConvert(true);
    } else {
      setPageConvert(false);
    }
  };

  let reader = new FileReader();
  const onImgChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLoadedImg({ imagePreviewUrl: reader.result, imageBlob: file });
      };
    }
  };

  return (
    <form className="matjip-review" onSubmit={handleSubmit(onEnrollReview)}>
      <div className="storeInfo">
        <div className="introduce">
          <span className="store-name">
            {searchResult.length !== 0
              ? searchResult[selected].place_name
              : "no"}
          </span>
          <span className="address">
            {searchResult.length !== 0
              ? searchResult[selected].road_address_name
              : "no"}
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
        {loadedImg.imagePreviewUrl ? (
          <Image src={loadedImg.imagePreviewUrl} width="40px" height="40px" />
        ) : (
          <></>
        )}
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
            left: ${pageConvert ? -800 : 0}px;
            min-width: 100%;
            height: 100%;
            background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;

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
        `}
      </style>
    </form>
  );
};

export default MatjipReview;
