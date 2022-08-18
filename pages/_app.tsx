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
import ErrorBoundary from "../components/ErrorBoundary";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const user: any = useSelector((state: rootState) => state.user);
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
    const publicPaths = [
      "/login",
      "/",
      "/signup",
      "/nearby-restaurant",
      "/store-detail",
    ];
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
        if (exp && exp < Date.now() / 1000) {
          await dispatch(logout());
          localStorage.removeItem("user");
          window.location.href = "/";
          //router.push("/");
        }
      }
      setAuthorized(true);
    }
  };

  return (
    <ErrorBoundary>
      <Head>
        <title>맛집대학</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>{authorized && <Component {...pageProps} />}</Layout>
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(MyApp);
