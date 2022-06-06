import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import RegisterItem from "./RegisterItem";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import _ from "lodash";

type props = {
  registerClose: boolean;
  setRegisterClose: React.Dispatch<React.SetStateAction<boolean>>;
};

type search = {
  [x: string]: any;
};

const MatjipRegister = ({ registerClose, setRegisterClose }: props) => {
  const [searchResult, setSearchResult] = useState<search>([]);
  const [selected, setSelected] = useState<number>(0);
  const [pageConvert, setPageConvert] = useState(false);
  const [star, setStar] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSearchComplete = (data: any) => {
    console.log(data);
    setSearchResult(data);
  };
  const onSearch: SubmitHandler<search> = (data) => {
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(data.target, onSearchComplete);
  };
  const onConvert = (dir: number) => {
    if (dir === 1 && searchResult.length !== 0) {
      setPageConvert(true);
    } else {
      setPageConvert(false);
    }
  };
  //보안
  const onEnrollReview = async (data: any) => {
    try {
      await fetchWrapper.post(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/add-place`,
        searchResult[selected]
      );

      await fetchWrapper.post(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/add-review`,
        {
          "place-id": "",
          "user-id": "",
          "post-date": "",
          "post-text": "",
          rating: "",
        }
      );
    } catch (err) {
      console.log(err);
    }
    window.alert("등록이 완료되었습니다.");
    setSearchResult([]);
    setSelected(0);
    setPageConvert(false);
    setRegisterClose(true);
  };

  return (
    <div className="MatjipRegister">
      <div className="content">
        <div
          className="exit-image-wrapper"
          onClick={() => setRegisterClose(true)}
        >
          <Image src="/exit.png" width="40px" height="40px" />
        </div>
        <div className="page-box">
          <div className="page-01">
            <form onSubmit={handleSubmit(onSearch)}>
              <input
                type="text"
                {...register("target")}
                className="search"
                placeholder="등록할 맛집을 검색해보세요"
              />
              <div className="search-image-wrapper">
                <Image src="/search.png" width="35px" height="35px" />
              </div>
            </form>
            <div className="result-box">
              {searchResult.length !== 0 ? (
                searchResult.map((result: search, i: number) => (
                  <RegisterItem
                    storeInfo={result}
                    order={i}
                    selected={selected}
                    setSelected={setSelected}
                    key={i}
                  />
                ))
              ) : (
                <span>no result</span>
              )}
            </div>
            <button className="btn-register" onClick={() => onConvert(1)}>
              등록
            </button>
          </div>
          <form className="page-02" onSubmit={handleSubmit(onEnrollReview)}>
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
                >
                  <Image src="/star-yellow.png" width="30px" height="30px" />
                </div>
              ))}
              {_.range(star, 5).map((v) => (
                <div
                  className="star-img-wrapper"
                  onClick={() => setStar(v + 1)}
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
              <button onClick={() => onConvert(-1)}>뒤로</button>
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>

      <style jsx>
        {`
          .MatjipRegister {
            z-index: 5;
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: ${registerClose ? "none" : "flex"};
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.5);

            .content {
              display: flex;
              overflow: hidden;
              position: relative;
              width: 800px;
              height: 510px;
              padding: 60px 50px 30px 50px;
              background: white;
              border-radius: 15px;

              .exit-image-wrapper {
                position: absolute;
                top: 20px;
                right: 20px;
              }

              .page-box {
                display: flex;
                overflow: hidden;
                position: relative;
                width: 800px;
                height: 510px;
              }

              .page-02 {
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

              .page-01 {
                min-width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                top: 0;
                left: ${pageConvert ? -800 : 0}px;
                transition-duration: 1s;

                form {
                  margin-bottom: 50px;
                  position: relative;
                  .search {
                    width: 500px;
                    height: 40px;
                    padding: 0px 20px;
                    border-radius: 10px;
                    border: 2px solid #f98600;
                    box-shadow: 0px 2px 1px grey;
                  }
                  .search::placeholder {
                    text-align: center;
                    color: black;
                  }
                  .search-image-wrapper {
                    position: absolute;
                    top: 5px;
                    right: 10px;
                  }
                }

                .result-box {
                  width: 100%;
                  height: 400px;
                  overflow-x: hidden;
                  overflow-y: scroll;
                }

                .result-box::-webkit-scrollbar {
                  width: 5px;
                  background-color: grey;
                }
                .result-box::-webkit-scrollbar-thumb {
                  background-color: #f98600;
                }
                .result-box::-webkit-scrollbar-track {
                }

                .btn-register {
                  width: 100px;
                  height: 50px;
                  border: 1px solid #f98600;
                  background-color: white;
                  margin-top: 10px;
                }
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default MatjipRegister;
