import React, { useState } from "react";
import Link from "next/link";
import SignIn from "./SignIn";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../store/modules/user";
import { rootState } from "../store/modules";

const Nav = () => {
  const [signinDisplay, setSigninDisplay] = useState(false);
  const user = useSelector((state: rootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const onSigninClick = () => {
    setSigninDisplay(true);
  };
  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    router.push("/");
  };
  return (
    <div>
      <SignIn
        signinDisplay={signinDisplay}
        setSigninDisplay={setSigninDisplay}
      />
      {user.user ? (
        <div className="sign">
          <span className="logout" onClick={onLogoutClick}>
            로그아웃
          </span>
        </div>
      ) : (
        <div className="sign">
          <span className="sign-in" onClick={onSigninClick}>
            로그인
          </span>
          <Link href="/signup">
            <a className="sign-up">회원가입</a>
          </Link>
        </div>
      )}
      <style jsx>
        {`
          .sign {
            position: absolute;
            top: 10px;
            right: 30px;

            span {
              font-size: 17px;
              margin: 5px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Nav;
