import React, { useState } from "react";
import Link from "next/link";
import SignIn from './SignIn';

import { userService } from '../services/user.service';

const Nav = () => {
    const [signinDisplay, setSigninDisplay] = useState("none");

    const onSigninClick = () => {
        setSigninDisplay("flex");
    };
    const onLogoutClick = () => {
        userService.logout();
    };
    return (
        <div>
            <SignIn
              signinDisplay={signinDisplay}
              setSigninDisplay={setSigninDisplay}
            />
            {userService.userValue ? 
            <div className='sign'>
                <span className='logout' onClick={onLogoutClick}>
                    로그아웃
                </span>
            </div>:
            <div className="sign">
                <span className="sign-in" onClick={onSigninClick}>
                    로그인
                </span>
                <Link href="/signup">
                    <a className="sign-up">회원가입</a>
                </Link>
            </div>
            }
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
    )
}

export default Nav;