import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { message, Modal } from "antd";
import { API_ROOT, API2_ROOT, ORIGINAL_ROOT } from "./config";
import isLogin from "./login";

const confirm = Modal.confirm;
export const http = axios.create({
  baseURL: API_ROOT
});

export const http2 = axios.create({
  baseURL: API2_ROOT
});

export const http_org = axios.create({
  baseURL: ORIGINAL_ROOT
});

export const getAuthorization = () => {
  let str = "";

  const auth_token = window.localStorage.getItem("auth_token");
  if (auth_token !== "undefined" && auth_token !== null) {
    str = JSON.parse(auth_token);
  }
  return str;
};
// 拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers.auth_token = getAuthorization();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (
    response: AxiosResponse<any>
  ): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
    console.log(response.data);

    if (response.data.success || Array.isArray(response.data)) {
      return response;
    } else {
      confirm({
        title: "提示!",
        content: "用户信息已过期，请点击确定后重新登录。",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          window.location.href = "/login";
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }

    return Promise.reject();
  },
  (error: any) => {
    if (!isLogin()) {
      confirm({
        title: "提示!",
        content: "用户信息已过期，请点击确定后重新登录。",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          window.location.href = "/login";
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
    return Promise.reject(error);
  }
);
