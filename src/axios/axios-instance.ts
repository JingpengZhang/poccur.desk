import axios, {AxiosError} from "axios";
import {message} from "antd";
import * as NProgress from "nprogress";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/admin'
});

// 错误处理函数
const handleErr = (error: AxiosError) => {
  const {response} = error
  message.error((response!.data as any).message)
  return Promise.reject(error);
};

// 请求拦截器
axiosInstance.interceptors.request.use((config) => {
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