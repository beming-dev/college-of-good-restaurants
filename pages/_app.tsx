import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/global.scss";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { wrapper } from "../store";
import { useSelector } from "react-redux";

interface payload {
  username: string;
  exp: number;
  college_id: number;
  iat: number;
}
function MyApp({ Component, pageProps }: AppProps) {
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    const s = localStorage.getItem("user");
    if (s) {
      const a = JSON.parse(s).jwt.split(".", 3);
    }
  }, []);
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  const authCheck = (url: string) => {
    const publicPaths = ["/login", "/", "/signup", "/nearby-restaurant"];
    const path = url.split("?")[0];
    if (!user.user && !publicPaths.includes(path)) {
      alert("로그인 후 이용해주세요");
      setAuthorized(false);
      router.push({
        pathname: "/",
      });
    } else {
      // const exp = userService.getExp();
      // if (exp && exp < Date.now() / 1000) userService.logout();
      setAuthorized(true);
    }
  };

  return <Layout>{authorized && <Component {...pageProps} />}</Layout>;
}

export default wrapper.withRedux(MyApp);
