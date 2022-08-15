import { useState } from "react";
import Image from "next/image";

import MatjipSearch from "./MatjipSearch";
import MatjipReview from "./MatjipReview";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterClose } from "../store/modules/close";
import { rootState } from "../store/modules";

type props = {};

type search = {
  [x: string]: string;
};

const MatjipRegister = () => {
  let close = useSelector((state: rootState) => state.close);
  const [pageConvert, setPageConvert] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="MatjipRegister">
      <div className="content">
        <div
          className="exit-image-wrapper"
          onClick={() => dispatch(setRegisterClose(true))}
        >
          <Image src="/exit.png" width="40px" height="40px" />
        </div>
        <div className="page-box">
          <MatjipSearch
            pageConvert={pageConvert}
            setPageConvert={setPageConvert}
          />
          <MatjipReview
            pageConvert={pageConvert}
            setPageConvert={setPageConvert}
          />
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
            display: ${close.registerClose ? "none" : "flex"};
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
                width: 40px;
                height: 40px;
                z-index: 5;
                position: absolute;
                top: 20px;
                right: 20px;
              }

              .page-box {
                display: flex;
                overflow: hidden;
                position: relative;
                width: 100%;
                height: 510px;
              }
            }
          }

          @media (max-width: 930px) {
            .MatjipRegister {
              .content {
                width: 650px;
                height: 460px;
                padding: 50px 40px 20px 40px;
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
                  height: 460px;
                }
              }
            }
          }

          @media (max-width: 780px) {
            .MatjipRegister {
              .content {
                width: 450px;
                height: 400px;
                padding: 40px 40px 20px 40px;
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
                  height: 400px;
                }
              }
            }
          }

          @media (max-width: 550px) {
            .MatjipRegister {
              .content {
                width: 300px;
                height: 400px;
                padding: 20px 20px 10px 20px;
                background: white;
                border-radius: 15px;

                .exit-image-wrapper {
                  width: 30px;
                  height: 30px;
                  top: 10px;
                  right: 10px;
                }

                .page-box {
                  display: flex;
                  overflow: hidden;
                  position: relative;
                  width: 100%;
                  height: 100%;
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
