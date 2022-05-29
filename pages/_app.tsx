import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/global.scss";
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'

import {userService} from '../services/user.service';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
      authCheck(router.asPath);

      const hideContent = () => setAuthorized(false);
      router.events.on('routeChangeStart', hideContent);
      router.events.on('routeChangeComplete', authCheck);
  
      return () => {
        router.events.off('routeChangeStart', hideContent);
        router.events.off('routeChangeComplete', authCheck);
      }
  }, []);

  const authCheck = (url:string) => {
    const publicPaths = ['/login', '/', '/signup', '/nearby-restaurant'];
    const path = url.split('?')[0];
    if(!userService.userValue && !publicPaths.includes(path)){
      alert("로그인 후 이용해주세요");
      setAuthorized(false);
      router.push({
        pathname: '/',
      })
    }else{
      setAuthorized(true);
    }
  }
  return (
    <Layout>
      {
        authorized && <Component {...pageProps} />
      }
    </Layout>
  );
}

export default MyApp;
