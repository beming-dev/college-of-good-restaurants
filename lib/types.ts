export interface collegeInfoType {
  college_name: string;
  number_of_students: number;
  college_id: number;
}

export interface windowSizeType {
  width: number | undefined;
  height: number | undefined;
}

export interface kakaoStoreType {
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

export interface serverStoreType {
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

export interface signupFormType {
  email: string;
  auth_code: string;
  user_id: string;
  password: string;
  nickname: string;
}

export interface pwChangeType {
  user_id: string;
  old_password: string;
  new_password: string;
}

export interface commentType {
  comment_text: string;
}

export interface commentServerType {
  comment_date: string;
  comment_id: number;
  comment_text: string;
  review_id: number;
  user_id: string;
}
