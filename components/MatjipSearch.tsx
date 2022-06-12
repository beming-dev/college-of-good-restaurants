import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import RegisterItem from "./RegisterItem";
type search = {
  [x: string]: string;
};

const MatjipSearch = ({
  searchResult,
  setSearchResult,
  selected,
  setSelected,
  pageConvert,
  setPageConvert,
}: any) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSearchComplete = (data: any) => {
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

  return (
    <div className="matjip-search">
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

      <style jsx>
        {`
          .matjip-search {
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
        `}
      </style>
    </div>
  );
};

export default MatjipSearch;
