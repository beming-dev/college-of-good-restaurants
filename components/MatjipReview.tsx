import { fetchWrapper } from "../helpers/fetch-wrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import _ from "lodash";
import Image from "next/image";
import { useSelector } from "react-redux";

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
  let user = useSelector((state: any) => state.user);
  user = user.user;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const createReviewData = () => {
    return {
      "place-id": searchResult[selected].place_id,
      "user-id": "",
      "post-date": "",
      "post-text": "",
      rating: "",
    };
  };

  const getImageFromKakao = () => {
    if (searchResult[selected]) {
      const url = `http://place.map.kakao.com/8152575`;
      console.log(url);
      fetchWrapper.post(url, {}).then((html) => console.log(html));
    }
  };

  getImageFromKakao();

  const onEnrollReview = async (data: any) => {
    if (!user) {
      alert("로그인 후 이용해주세요");
    } else {
      try {
        await fetchWrapper.post(
          `${process.env.NEXT_PUBLIC_SERVER_IP}/add-place`,
          searchResult[selected]
        );

        await fetchWrapper.post(
          `${process.env.NEXT_PUBLIC_SERVER_IP}/add-review`,
          createReviewData()
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
