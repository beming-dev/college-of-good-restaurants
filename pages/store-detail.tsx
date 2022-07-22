import { map } from "cheerio/lib/api/traversing";
import { NextPage } from "next";
import Map, { storeFromServer } from "../components/Map";
import ReviewItem from "../components/ReviewItem";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rootState } from "../store/modules";
import {
  copyToClipBoard,
  getJwtUsername,
  toStringByFormatting,
} from "../lib/util";
import { useRouter } from "next/router";
import axios from "axios";

interface reviewType {
  rating: number;
  place_id: number;
  user_id: string;
  post_date: string;
  post_text: string;
  image_urls: string[];
}
interface propsType {
  storeInfo: storeFromServer;
  reviewInfo: reviewType[];
  pages: number;
}

const storeDetail: NextPage<propsType> = ({ storeInfo, reviewInfo }) => {
  reviewInfo = [
    {
      image_urls: [
        "https://test.image.1",
        "https://test.image.2",
        "https://test.image.3",
      ],
      place_id: 1,
      post_date: "2022-05-31",
      post_text: "테스트용 리뷰",
      rating: 4,
      user_id: "wonbinkim",
    },
    {
      image_urls: [
        "https://test.image.1",
        "https://test.image.2",
        "https://test.image.3",
      ],
      place_id: 1,
      post_date: "2022-05-31",
      post_text: "테스트용 리뷰",
      rating: 4,
      user_id: "wonbinkim",
    },
    {
      image_urls: [
        "https://test.image.1",
        "https://test.image.2",
        "https://test.image.3",
      ],
      place_id: 1,
      post_date: "2022-05-31",
      post_text: "테스트용 리뷰",
      rating: 4,
      user_id: "wonbinkim",
    },
    {
      image_urls: [
        "https://test.image.1",
        "https://test.image.2",
        "https://test.image.3",
      ],
      place_id: 1,
      post_date: "2022-05-31",
      post_text: "테스트용 리뷰",
      rating: 4,
      user_id: "wonbinkim",
    },
    {
      image_urls: [
        "https://test.image.1",
        "https://test.image.2",
        "https://test.image.3",
      ],
      place_id: 1,
      post_date: "2022-05-31",
      post_text: "테스트용 리뷰",
      rating: 4,
      user_id: "wonbinkim",
    },
    {
      image_urls: [
        "https://test.image.1",
        "https://test.image.2",
        "https://test.image.3",
      ],
      place_id: 1,
      post_date: "2022-05-31",
      post_text: "테스트용 리뷰",
      rating: 4,
      user_id: "wonbinkim",
    },
    {
      image_urls: [
        "https://test.image.1",
        "https://test.image.2",
        "https://test.image.3",
      ],
      place_id: 1,
      post_date: "2022-05-31",
      post_text: "테스트용 리뷰",
      rating: 4,
      user_id: "wonbinkim",
    },
  ];
  const router = useRouter();
  const user = useSelector((state: rootState) => state.user);
  const map = useSelector((state: rootState) => state.map);
  const [hearted, setHearted] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user.user) {
      const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place-like/exist`;
      fetchWrapper
        .post(url, {
          user_id: getJwtUsername(user.user),
          place_id: storeInfo.place_id,
        })
        .then((data: any) => {
          if (data.result === "true") {
            setHearted(true);
          } else {
            setHearted(false);
          }
        })
        .catch((err) => {
          alert("좋아요 확인 과정에서 오류 발생");
        });
    }
  }, []);

  useEffect(() => {
    axios({
      method: "POST",
      url: "/api/crawler",
      data: { id: storeInfo.kakao_place_id },
    }).then((data) => console.log(data));
  }, []);

  const iconList = [
    {
      imgName: "/map.png",
      txt: "지도",
      onClick: () => {
        console.log(1);
        const url = `https://map.kakao.com/link/map/${storeInfo.kakao_place_id}`;
        window.open(url);
      },
    },
    {
      imgName: "/roadfind.png",
      txt: "길찾기",
      onClick: () => {
        const url = `https://map.kakao.com/link/to/${storeInfo.kakao_place_id}`;
        window.open(url);
      },
    },
    {
      imgName: "/roadview.png",
      txt: "로드뷰",
      onClick: () => {
        const url = `https://map.kakao.com/link/roadview/${storeInfo.kakao_place_id}`;
        window.open(url);
      },
    },
    {
      imgName: "/share.png",
      txt: "공유하기",
      onClick: (value: string) => {
        copyToClipBoard(value);
      },
    },
  ];
  const onHeartClick = () => {
    let url;
    let form;
    if (hearted) {
      url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place-like/remove`;
      form = {
        place_id: storeInfo.place_id,
        user_id: getJwtUsername(user.user),
      };
    } else {
      url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place-like/add`;
      form = {
        place_id: storeInfo.place_id,
        user_id: getJwtUsername(user.user),
        like_date: toStringByFormatting(new Date()),
      };
    }
    fetchWrapper
      .post(url, form)
      .then((data) => {
        setHearted(!hearted);
      })
      .catch((err) => alert("좋아요 처리 과정에서 에러 발생"));
  };
  return (
    <div className="store-detail">
      <div className="map-box">
        <Map x={storeInfo.longitude} y={storeInfo.latitude} />
      </div>
      <div className="cover"></div>
      <div className="content">
        <div className="main">
          <h1 className="store-name">{storeInfo.name}</h1>
          <div className="rate-review">
            <span className="rate-count"> 평점 4.5 </span>
            <span className="review-count"> 리뷰 39 </span>
            <div className="heart-wrapper" onClick={onHeartClick}>
              {hearted
                ? user.user && (
                    <Image
                      src="/heart-red.png"
                      layout="fill"
                      objectFit="contain"
                    />
                  )
                : user.user && (
                    <Image src="/heart.png" layout="fill" objectFit="contain" />
                  )}
            </div>
          </div>
          <div className="icon-box">
            {iconList.map((icon, i) => (
              <div
                className="icon-item"
                key={i}
                onClick={(e: any) =>
                  i == 3
                    ? icon.onClick(
                        process.env.NEXT_PUBLIC_CLIENT_URL + router.asPath
                      )
                    : icon.onClick(e)
                }
              >
                <div className="img-container">
                  <Image src={icon.imgName} layout="fill" objectFit="contain" />
                </div>
                <span>{icon.txt}</span>
              </div>
            ))}
          </div>
          <div className="icon-box"></div>
        </div>
        <div className="detail">
          <h2>상세정보</h2>
          <span className="address">{storeInfo.address}</span>
          <span className="phone">{storeInfo.phone || "00-0000-0000"}</span>
        </div>
        <div className="review">
          <span>리뷰</span>
          {reviewInfo.map((review, i) => (
            <ReviewItem review={review} key={i} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .store-detail {
          height: fit-content;
          .map-box {
            width: 100vw;
            height: 100vh;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -2;
          }
          .cover {
            width: 100vw;
            height: 100vh;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            background-color: rgba(255, 255, 255, 0.7);
          }

          display: flex;
          align-items: center;
          justify-content: center;

          .content {
            width: 800px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            border: 1px solid #ebebeb;

            .main {
              display: flex;
              flex-direction: column;
              align-items: center;
              border-bottom: 1px solid gray;

              .store-name {
                font-size: 40px;
                font-weight: bold;
                margin: 10px 0;
              }

              .rate-review {
                display: flex;
                align-items: center;
                margin: 20px 0;
                span {
                  margin: 0 10px;
                }

                .heart-wrapper {
                  position: relative;
                  width: 20px;
                  height: 20px;
                }
              }

              .icon-box {
                width: 70%;
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;

                .icon-item {
                  width: 100px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;

                  .img-container {
                    position: relative;
                    width: 30px;
                    height: 30px;
                    margin-bottom: 5px;
                  }
                }
                .icon-item:hover {
                  cursor: pointer;
                }
              }
            }
            .detail {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: start;
              margin: 20px 0px;
              h2 {
                font-size: 20px;
                font-weight: bold;
                margin: 10px 0px;
              }
              span {
                margin: 5px 0px;
              }
            }
            .review {
              margin: 20px 0;
              width: 100%;
              display: flex;
              flex-direction: column;
            }
          }
        }
      `}</style>
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  const url01 = `${process.env.NEXT_PUBLIC_SERVER_IP}/place/get-place`;
  let resp01;
  await fetchWrapper.post(url01, { place_id: ctx.query.id }).then((data) => {
    resp01 = data;
  });

  const url02 = `${process.env.NEXT_PUBLIC_SERVER_IP}/review/get-reviews`;
  let resp02: any = 1;
  await fetchWrapper
    .post(url02, { place_id: ctx.query.id, page: "1" })
    .then((data) => {
      resp02 = data;
    })
    .catch((err) => console.log(err));

  return {
    props: {
      storeInfo: resp01,
      reviewInfo: resp02 ? resp02 : [],
    },
  };
}

export default storeDetail;
