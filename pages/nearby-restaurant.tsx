import { useState } from "react";
import Map from "../components/Map";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import * as yup from "yup";

import HamburgerMenu from "../components/HamburgerMenu";
import SearchResult from "../components/SearchResult";
import MatjipRegister from "../components/MatjipRegister";
import { userService } from "../services/user.service";

const nearbyRestaurant = () => {
  const [resultClose, setResultClose] = useState(true);
  const [menuClose, setMenuClose] = useState(true);
  const [registerClose, setRegisterClose] = useState(true);

  const router = useRouter();
  const { target } = router.query;

  const schema = yup.object().shape({
    searchTarget: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //url수정 필요
  const onSubmit = (data: any) => {
    setResultClose(false);
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/searchRequest`;
    //fetchWrapper.post(url, data)
  };
  const onClickPlus = () => {
    if (!userService.userValue) {
      alert("로그인 후 이용해주세요");
    } else {
      setRegisterClose(false);
    }
  };

  return (
    <div>
      <Map />
      <MatjipRegister
        registerClose={registerClose}
        setRegisterClose={setRegisterClose}
      />
      <HamburgerMenu menuClose={menuClose} setMenuClose={setMenuClose} />
      <div className="content">
        <SearchResult
          resultClose={resultClose}
          setResultClose={setResultClose}
        />
        <form className="input-box" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="search"
            placeholder="장소, 분류 검색"
            {...register("searchTarget")}
          />
          <button className="ico-search">
            <Image src="/search.png" width={30} height={30} alt="search" />
          </button>
          <div className="ico-hamburger" onClick={() => setMenuClose(false)}>
            <Image
              src="/hamburger.png"
              width={30}
              height={30}
              alt="hamburger"
            />
          </div>
        </form>
      </div>

      <div className="plus-img-wrapper" onClick={onClickPlus}>
        <Image src="/plus.png" width={50} height={50} alt="plus" />
      </div>

      <style jsx>
        {`
          .content {
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;

            .input-box {
              z-index: 10;
              margin: 10px 20px;
              position: relative;

              input {
                padding: 0 50px;
              }

              .search {
                width: 300px;
                height: 40px;
                border-radius: 10px;
                border: 2px solid #f98600;
              }

              .ico-search {
                position: absolute;
                top: 6px;
                right: 10px;
                color: black;
                border: none;
                background: none;
              }

              .ico-hamburger {
                position: absolute;
                top: 6px;
                left: 10px;
              }
            }
          }

          .plus-img-wrapper {
            z-index: 3;
            position: absolute;
            bottom: 10px;
            right: 10px;
          }
          .plus-img-wrapper:hover {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default nearbyRestaurant;
