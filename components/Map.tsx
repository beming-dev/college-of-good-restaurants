import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMap } from "../store/modules/map";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = ({ x = 126.570667, y = 33.450701 }: any) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API}&autoload=false&libraries=services`;
    script.addEventListener("load", () => setMapLoaded(true));
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(y, x),
        level: 3,
      };

      dispatch(setMap(new window.kakao.maps.Map(container, options)));
    });
  }, [mapLoaded]);

  return (
    <div
      id="map"
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
      }}
    ></div>
  );
};

export default Map;
