import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import MypageNav from "../../components/MypageNav";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import { useSelector } from "react-redux";
import { rootState } from "../../store/modules";
import { pwChangeType } from "../../lib/types";
import { useEffect } from "react";

const mypage = () => {
  const user = useSelector((state: rootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user.user) {
      alert("로그인후 이용해주세요.");
      router.push("/");
    }
  }, []);
  const {
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<pwChangeType>({});

  const onPwChange = (data: pwChangeType) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/user-management/security/change-password`;
    fetchWrapper
      .post(
        url,
        {
          user_id: data.user_id,
          old_password: btoa(data.old_password),
          new_password: btoa(data.new_password),
        },
        user.user
      )
      .then(() => {
        alert("비밀번호가 변경되었습니다.");
      }, user.user)
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div className="mypage">
      <MypageNav />
      <div className="container2">
        <form className="container" onSubmit={handleSubmit(onPwChange)}>
          <div className="about-user">
            <div className="info">
              <span className="school">서울시립대학교</span>
              <span>인증된 이메일 wonbinkim@uos.ac.kr</span>
            </div>
            <div className="user-img-wrapper">
              <Image src="/user-black.png" layout="fill" />
            </div>
          </div>
          <div className="login-info">
            <div className="nickname box" onSubmit={handleSubmit(onPwChange)}>
              <label htmlFor="">닉네임</label>
              <input type="text" readOnly value={"beming"} />
            </div>
            <div className="id box">
              <label htmlFor="">아이디</label>
              <input
                type="text"
                readOnly
                {...register("user_id")}
                value={"wonbinkim"}
              />
            </div>
            <div className="password box">
              <label htmlFor="old-pw">현재 비밀번호</label>
              <input
                id="old-pw"
                type="password"
                {...register("old_password")}
              />
            </div>
            <div className="password-cahage box">
              <label htmlFor="new-pw">변경할 비밀번호</label>
              <input
                id="new-pw"
                type="password"
                {...register("new_password")}
              />
            </div>
          </div>
          <input type="submit" className="btn-change" value="비밀번호 변경" />
        </form>
      </div>
      <style jsx>{`
        .mypage {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;

          .logo:hover {
            cursor: pointer;
          }

          .container2 {
            display: flex;
            flex-direction: column;

            align-items: center;
            width: 100%;
          }

          .container {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            width: 500px;
            height: 500px;
            border: 1px solid #f98600;
            border-radius: 10px;
            padding: 10px;

            .about-user {
              display: flex;
              align-items: center;
              justify-content: space-evenly;

              .info {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;

                .school {
                  font-weight: bold;
                  font-size: 2rem;
                }
              }
              .user-img-wrapper {
                position: relative;
                width: 100px;
                height: 100px;
              }
            }

            .login-info {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              .box {
                width: 70%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 10px 0;
                label {
                  text-align: center;
                  font-size: 1.3rem;
                }
                input {
                  height: 25px;
                  border-radius: 5px;
                  border: 1px solid #f98600;
                }
              }
            }

            .btn-change {
              width: 150px;
              height: 50px;
              background: white;
              color: #f98600;
              border: 1px solid #f98600;
              border-radius: 5px;
              transition-duration: 0.5s;
            }
            .btn-change:hover {
              background: #f98600;
              color: white;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default mypage;
