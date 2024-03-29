import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

//타입 수정 필요
type getType = (
  url: string,
  body: { [id: string]: string }
) => Promise<Response | ((value: Response) => boolean | PromiseLike<boolean>)>;
type postType = (url: string, body: any, user?: any) => any;
type putType = (
  url: string,
  body: { [id: string]: string }
) => Promise<Response | ((value: Response) => boolean | PromiseLike<boolean>)>;
type deleteType = (
  url: string
) => Promise<Response | ((value: Response) => boolean | PromiseLike<boolean>)>;
type authHeader = (
  url: string,
  data: { [id: string]: string },
  user?: any
) => HeadersInit | undefined | {};

interface fetchWrapper {
  get: getType;
  post: postType;
  put: putType;
  delete: deleteType;
}

const get: getType = (url, body) => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
      ...authHeader(url, body),
    },
  };
  return fetch(url, requestOptions).then(handleResponse);
};

const post: postType = (url, body, user = null) => {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
      ...authHeader(url, body, user),
    },
    body: body.username && body.password ? "" : JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
};

const put: putType = (url, body) => {
  const requestOptions: RequestInit = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader(url, body) },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
};

// prefixed with underscored because delete is a reserved word in javascript
const _delete: deleteType = (url) => {
  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: authHeader(url, {}),
  };
  return fetch(url, requestOptions).then(handleResponse);
};

// helper functions

const authHeader: authHeader = (url, data, user = null) => {
  // return auth header with jwt if user is logged in and request is to the api url
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (user && isApiUrl) {
    return { Authorization: `Bearer ${user}` };
  } else if (url.includes("login") && data.username && data.password) {
    return {
      Authorization:
        "Basic " + window.btoa(data.username + ":" + data.password),
    };
  } else {
    return {};
  }
};

type handleResponseType = (
  value: Response
) =>
  | ((value: Response) => boolean | PromiseLike<boolean>)
  | PromiseLike<(value: Response) => boolean | PromiseLike<boolean>>;

const handleResponse: handleResponseType = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      // if ([401, 403].includes(response.status) && userService.userValue) {
      //   // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      //   userService.logout();
      // }

      const error = data || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const fetchWrapper: fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};
