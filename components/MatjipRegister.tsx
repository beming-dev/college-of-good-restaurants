import { useState } from "react";
import Image from "next/image";

import MatjipSearch from "./MatjipSearch";
import MatjipReview from "./MatjipReview";

type props = {
  registerClose: boolean;
  setRegisterClose: React.Dispatch<React.SetStateAction<boolean>>;
};

type search = {
  [x: string]: string;
};

const MatjipRegister = ({ registerClose, setRegisterClose }: props) => {
  const [searchResult, setSearchResult] = useState<search[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [pageConvert, setPageConvert] = useState(false);
  const [star, setStar] = useState(0);

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
          <MatjipSearch
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            selected={selected}
            setSelected={setSelected}
            pageConvert={pageConvert}
            setPageConvert={setPageConvert}
          />
          <MatjipReview
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            selected={selected}
            setSelected={setSelected}
            pageConvert={pageConvert}
            setPageConvert={setPageConvert}
            setRegisterClose={setRegisterClose}
            star={star}
            setStar={setStar}
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
