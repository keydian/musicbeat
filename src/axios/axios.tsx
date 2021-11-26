import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import store, { logout, reset_token } from "../redux/redux";
import { LoginCreds, RegisterCreds } from "../types/types";

//const url = "https://ipm2122appwesteurope55310.azurewebsites.net/rest/";
const url = "http://localhost:8080/rest/"

axios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    let token = store.getState().token;
    if (token) {
      config.headers = {
        "authorization": token
      }
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  function (config: AxiosResponse) {
    if (
      store.getState().token !== "" &&
      !config.config.url?.includes("logout")
    ) {
      store.dispatch(reset_token(config.headers["authorization"]));
      localStorage.setItem("token", config.headers["authorization"]);
    }
    return config;
  },
  function (err) {
    if (err.response.status === 401) {
      localStorage.removeItem("token");
      store.dispatch(logout());
    }
    return Promise.reject(err);
  }
);

export async function loginUser(creds: LoginCreds) {
  return await axios.put(url.concat("users"), creds)
}


export async function registerUser(creds: RegisterCreds) {
  return await axios.post(url.concat("users"), creds);
}

export async function getUser(username : string) {
  return await axios.get(url.concat(`users/${username}`))
}
