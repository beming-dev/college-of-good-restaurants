import { NextPage } from "next";
import ReviewItem from "../components/ReviewItem";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../store/modules";
import {
  copyToClipBoard,
  getJwtUsername,
  toStringByFormatting,
} from "../lib/util";
import { useRouter } from "next/router";
import { reviewType, serverStoreType } from "../lib/types";
import Map from "../components/Map";
import EnrollReview from "../components/EnrollReview";
import { setEnrollReviewClose } from "../store/modules/close";

const storeDetail: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: rootState) => state.user);

  const [hearted, setHearted] = useState(false);
  const [page, setPage] = useState(1);
  const [storeInfo, setStoreInfo] = useState<serverStoreType>({
    address: "",
    category: "",
    image_url: "",
    kakao_place_id: "",
    latitude: 1,
    like_count: 1,
    longitude: 1,
    name: "",
    phone: "",
    place_id: 1,
    rating: 1,
    review_count: 1,
  });
  const [reviewInfo, setReviewInfo] = useState<reviewType[]>([]);

  useEffect(() => {
    getPlaceData();
    getReviewData();
  }, [page]);

  const iconList = [
    {
      imgName: "/map.png",
      txt: "지도",
      onClick: () => {
        const url = `https://map.kakao.com/link/map/${storeInfo?.kakao_place_id}`;
        window.open(url);
      },
    },
    {
      imgName: "/roadfind.png",
      txt: "길찾기",
      onClick: () => {
        const url = `https://map.kakao.com/link/to/${storeInfo?.kakao_place_id}`;
        window.open(url);
      },
    },
    {
      imgName: "/roadview.png",
      txt: "로드뷰",
      onClick: () => {
        const url = `https://map.kakao.com/link/roadview/${storeInfo?.kakao_place_id}`;
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

  const onMoreClick = () => {
    setPage(page + 1);
  };

  const getPlaceData = () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place/get-place`;
    if (router.query.id) {
      fetchWrapper
        .post(url, { place_id: router.query.id })
        .then((store: serverStoreType) => {
          setStoreInfo(store);
          getHeartData(store);
        });
    }
  };

  const getReviewData = () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/review/get-reviews`;
    if (router.query.id) {
      fetchWrapper
        .post(url, {
          place_id: router.query.id,
          scope_start: 10 * (page - 1) + 1 + "",
          scope_end: 10 * page,
        })
        .then((data: reviewType[]) => {
          const arr = [...reviewInfo, ...data];
          setReviewInfo(arr);
        })
        .catch((err: any) => console.log(err));
    }
  };

  const getHeartData = (store: serverStoreType) => {
    if (user.user) {
      const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place-like/exist`;
      fetchWrapper
        .post(url, {
          user_id: getJwtUsername(user.user),
          place_id: store.place_id,
        })
        .then((data: any) => {
          if (data.result === "true") {
            setHearted(true);
          } else {
            setHearted(false);
          }
        })
        .catch((err: any) => {
          console.log(err);
          alert("좋아요 확인 과정에서 오류 발생");
        });
    }
  };

  const onHeartClick = () => {
    let url;
    let form;
    if (hearted) {
      url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place-like/remove`;
      form = {
        place_id: storeInfo?.place_id,
        user_id: getJwtUsername(user.user),
      };
    } else {
      url = `${process.env.NEXT_PUBLIC_SERVER_IP}/place-like/add`;
      form = {
        place_id: storeInfo?.place_id,
        user_id: getJwtUsername(user.user),
        like_date: toStringByFormatting(new Date()),
      };
    }
    fetchWrapper
      .post(url, form)
      .then(() => {
        setHearted(!hearted);
      })
      .catch(() => alert("좋아요 처리 과정에서 에러 발생"));
  };

  return (
    <div className="store-detail">
      <div className="map-box">
        <Map x={storeInfo?.longitude} y={storeInfo?.latitude} />
      </div>
      <div className="cover"></div>
      <div className="content">
        <div className="main">
          <h1 className="store-name">{storeInfo?.name}</h1>
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
          <div className="address-box">
            <div className="location-img-wrapper">
              <Image src="/location.png" layout="fill" />
            </div>
            <span className="address">{storeInfo?.address}</span>
          </div>
          <div className="phone-box">
            <div className="phone-img-wrapper">
              <Image src="/phone.png" layout="fill" />
            </div>
            <span className="phone">{storeInfo?.phone || "00-0000-0000"}</span>
          </div>
        </div>
        <div className="review">
          <span style={{ marginBottom: "10px" }}>리뷰</span>
          {reviewInfo?.map((review, i) => (
            <ReviewItem review={review} key={i} />
          ))}
          <button className="btn-more" onClick={onMoreClick}>
            더보기
          </button>
        </div>

        <button
          className="btn-enroll-review"
          onClick={() => dispatch(setEnrollReviewClose(false))}
        >
          리뷰등록
        </button>
        <EnrollReview store={storeInfo} />
      </div>
      <style jsx>{`
        .store-detail {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;

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
            background-color: rgba(255, 255, 255, 0.2);
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
            background-color: rgba(255, 255, 255, 0.9);

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
              .address-box {
                margin: 5px 0;
                display: flex;
                .location-img-wrapper {
                  margin-right: 5px;
                  position: relative;
                  width: 16px;
                  height: 20px;
                }
              }
              .phone-box {
                margin: 5px 0;
                display: flex;
                .phone-img-wrapper {
                  margin-right: 5px;
                  position: relative;
                  width: 20px;
                  height: 20px;
                }
              }
            }
            .review {
              margin: 20px 0;
              width: 100%;
              display: flex;
              flex-direction: column;

              .btn-more {
                margin-top: 20px;
                align-self: center;
                width: 150px;
                height: 50px;
                border-radius: 5px;
                background: white;
                border: 1px solid #f98600;
                transition-duration: 0.5s;
              }
              .btn-more:hover {
                background: #f98600;
                color: white;
              }
            }
          }

          .btn-enroll-review {
            font-size: 15px;
            position: absolute;
            bottom: 20px;
            right: 20px;
            padding: 10px;
            background-color: white;
            border-radius: 5px;
            border: 2px solid #f98600;
            cursor: pointer;
          }
        }

        @media (max-width: 960px) {
          .store-detail {
            .content {
              width: 500px;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default storeDetail;
