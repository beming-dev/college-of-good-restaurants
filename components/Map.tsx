import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMap } from "../store/modules/map";

declare global {
  interface Window {
    kakao: any;
  }
}

export interface storeType {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface storeFromServer {
  address: string;
  category: string;
  image_url: null | string;
  kakao_place_id: string;
  latitude: number;
  like_count: number;
  longitude: number;
  name: string;
  phone: string;
  place_id: number;
  rating: number;
  review_count: number;
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
