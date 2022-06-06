import { BehaviorSubject, Observable } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "../helpers/fetch-wrapper";

type loginF = (username: string, password: string) => Promise<any>;
type logoutF = () => void;
type getAllF = () => Promise<any>;
type getPayloadF = () => any;
type getCollegeIdF = () => string;
type getExpF = () => number;
type getUsernameF = () => string;

interface userService {
  user: Observable<boolean | null>;
  userValue: any;
  login: loginF;
  logout: logoutF;
  getAll: getAllF;
  getUsername: getUsernameF;
  getExp: getExpF;
  getCollegeId: getCollegeIdF;
}

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

//타입 문제 있음 string||null
const userSubject: BehaviorSubject<any> = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user") || "null")
);

const login: loginF = (username, password) => {
  return fetchWrapper
    .post(`${baseUrl}/user-management/login`, { username, password })
    .then((user) => {
      userSubject.next(user);
      localStorage.setItem("user", JSON.stringify(user));
      Router.push("/");
      return user;
    });
};

const logout: logoutF = () => {
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/");
};

const getAll: getAllF = () => {
  return fetchWrapper.get(baseUrl);
};

const getPayload: getPayloadF = () => {
  if (userSubject.value) {
    const jwt = userSubject.value.jwt.split(".");
    const payload: any = JSON.parse(window.atob(jwt[1]));
    return payload;
  } else {
    return null;
  }
};
const getCollegeId: getCollegeIdF = () => {
  const payload = getPayload();
  if (payload) {
    return payload.college_id;
  } else {
    return null;
  }
};
const getUsername: getUsernameF = () => {
  const payload = getPayload();
  if (payload) {
    return payload.username;
  } else {
    return null;
  }
};
const getExp: getExpF = () => {
  const payload = getPayload();
  if (payload) {
    return payload.exp;
  } else {
    return null;
  }
};

export const userService: userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  getAll,
  getUsername,
  getExp,
  getCollegeId,
};
