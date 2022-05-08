import React, { useEffect, useState } from "react";

const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API}&autoload=false&libraries=services`;
    script.addEventListener("load", () => setMapLoaded(true));
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    console.log(window.kakao);
    if (!mapLoaded) return;

    window.kakao.maps.load(() => {
      let container = document.getElementById("map");
      let options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      let map = new window.kakao.maps.Map(container, options);
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
