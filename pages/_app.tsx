import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/global.scss";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { wrapper } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/modules/user";
import { getJwtExp } from "../lib/util";
import { rootState } from "../store/modules";

function MyApp({ Component, pageProps }: AppProps) {
  const user = useSelector((state: rootState) => state.user);
  const dispatch = useDispatch();
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

  const authCheck = async (url: string) => {
    const publicPaths = ["/login", "/", "/signup", "/nearby-restaurant"];
    const path = url.split("?")[0];
    if (!user.user && !publicPaths.includes(path)) {
      alert("로그인 후 이용해주세요");
      setAuthorized(false);
      router.push({
        pathname: "/",
      });
    } else {
      if (user.user) {
        const exp = getJwtExp(user.user);
        console.log(Date.now() / 1000);
        if (exp && exp < Date.now() / 1000) {
          console.log(1);
          await dispatch(logout());
          localStorage.removeItem("user");
          router.push("/");
        }
      }
      setAuthorized(true);
    }
  };

  return <Layout>{authorized && <Component {...pageProps} />}</Layout>;
}

export default wrapper.withRedux(MyApp);
