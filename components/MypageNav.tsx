import { useRouter } from "next/router";

const MypageNav = () => {
  const router = useRouter();
  return (
    <div className="mypage-nav">
      <span className="logo" onClick={() => router.push("/")}>
        맛집대학
      </span>
      <ul>
        <li onClick={() => router.push("/mypage")}>마이페이지</li>
        <li onClick={() => router.push("/mypage/like")}>좋아요 목록</li>
        <li onClick={() => router.push("/mypage/store")}>등록한 가게</li>
        <li onClick={() => router.push("/mypage/review")}>등록한 리뷰</li>
      </ul>
      <style jsx>
        {`
          .mypage-nav {
            width: 150px;
            margin-left: 50px;
            ul {
              li {
                font-weight: bold;
                font-size: 1.2rem;
                margin: 20px 0;
              }
            }
            .logo {
              position: absolute;
              top: 20px;
              left: 20px;
              font-family: "Nanum Pen Script";
              font-size: 3rem;
              letter-spacing: 2rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MypageNav;
