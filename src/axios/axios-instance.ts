import axios, {AxiosError} from "axios";
import {message} from "antd";
import * as NProgress from "nprogress";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

// 错误处理函数
const handleErr = (error: AxiosError) => {
  const {response} = error
  if (response) {
    message.error((response!.data as any).message)
  }
  NProgress.done()
  if (error.code === "ERR_NETWORK") {
    window.location.pathname = '/error-network'
  }
  return Promise.reject(error);
};

// 请求拦截器
axiosInstance.interceptors.request.use((config) => {

  if (window.location.pathname === '/error-network') {
    return Promise.reject('ERR_NETWORK')
  }

  NProgress.start();
  config.headers.token = '';
  return config
}, handleErr)

// 响应拦截器
axiosInstance.interceptors.response.use((response) => {
  NProgress.done()
  return response;
}, handleErr);

export default axiosInstance