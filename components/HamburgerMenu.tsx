import Image from "next/image";
import { useState } from "react";
import SignIn from "./SignIn";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

type props = {
  menuClose: boolean;
  setMenuClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const HamburgerMenu = ({ menuClose, setMenuClose }: props) => {
  let user = useSelector((state: any) => state.user);
  user = user.user;
  const [signinDisplay, setSigninDisplay] = useState(false);
  const router = useRouter();
  const onExitClick = () => {
    setMenuClose(true);
  };
  return (
    <div className="hamburger-menu">
      <SignIn
        signinDisplay={signinDisplay}
        setSigninDisplay={setSigninDisplay}
      />
      <div className="img-exit-wrapper" onClick={onExitClick}>
        <Image src="/exit-grey.png" width={30} height={30} />
      </div>
      <div className="user">
        <div className="user-img-wrapper">
          <Image src="/user.png" width="30px" height="30px" />
        </div>
        {user ? (
          <div className="user-info">
            <span className="nickname">Beming</span>
            <span className="college">서울시립대학교</span>
          </div>
        ) : (
          <div>
            <span className="do-login" onClick={() => setSigninDisplay(true)}>
              로그인하세요 {">"}
            </span>
          </div>
        )}
      </div>
      <div className="option">
        <div className="option-box" onClick={() => router.push("/")}>
          <Image src="/good.png" width={40} height={40} />
          <span>메인으로</span>
        </div>
        <div className="option-box">
          <Image src="/good.png" width={40} height={40} />
          <span>좋아요 목록</span>
        </div>
        <div className="option-box">
          <Image src="/plus-black.png" width={40} height={40} />
          <span>맛집 등록</span>
        </div>
        <div className="option-box">
          <Image src="/setting.png" width={40} height={40} />
          <span>설정</span>
        </div>
      </div>
      <style jsx>
        {`
          .hamburger-menu {
            position: absolute;
            top: 0;
            left: ${menuClose ? -500 : 0}px;
            width: 400px;
            height: 100vh;
            border-radius: 0 10px 10px 0;
            background: white;
            z-index: 4;
            transition-duration: 1s;
            padding: 0 50px;

            .img-exit-wrapper {
              position: absolute;
              top: 20px;
              right: 30px;
            }

            .user {
              width: 100%;
              height: 70px;
              display: flex;
              align-items: center;
              padding: 0 10px;
              .user-info {
                height: 60%;
                margin-left: 20px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }

              .do-login {
                margin-left: 20px;
              }
              .do-login:hover {
                cursor: pointer;
              }
            }

            .option {
              border-top: 1px solid #f98600;
              border-bottom: 1px solid #f98600;
              width: 100%;
              .option-box {
                width: 100%;
                height: 70px;
                display: flex;
                align-items: center;
                padding: 0 10px;

                span {
                  margin-left: 20px;
                }
              }
              .option-box:hover {
                cursor: pointer;
              }
            }
          }

          @media (max-width: 780px) {
            .hamburger-menu {
              position: absolute;
              top: 0;
              left: ${menuClose ? -350 : 0}px;
              width: 300px;
              padding: 0 25px;

              .user {
                width: 100%;
                height: 70px;
                padding: 0 10px;
                .user-info {
                  height: 60%;
                  margin-left: 20px;
                }
              }
            }
          }

          @media (max-width: 480px) {
            .hamburger-menu {
              position: absolute;
              top: 0;
              left: ${menuClose ? -100 : 0}vw;
              width: 100vw;
              padding: 0 0;

              .user {
                width: calc(100% - 20px);
                height: 70px;
                padding: 0 10px;
                .user-info {
                  height: 60%;
                  margin-left: 20px;
                }
              }

              .option {
                border-top: 1px solid #f98600;
                border-bottom: 1px solid #f98600;
                width: 100%;
                .option-box {
                  width: calc(100% - 20px);
                  height: 70px;
                  display: flex;
                  align-items: center;
                  padding: 0 10px;
                }
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default HamburgerMenu;
