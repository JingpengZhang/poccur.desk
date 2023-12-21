import axios, {AxiosError} from "axios";
import {message} from "antd";
import NProgress from "nprogress";
import {store} from "@/store";

const axiosInstance = axios.create({
  baseURL: '//' + import.meta.env.VITE_APP_API_PREFIX
});

// 错误处理函数
const handleErr = (error: AxiosError) => {
  const {response} = error
  if (response) {
    message.error((response!.data as any).message)
    if (response.status === 401) {
      // window.location.pathname = '/unauthorized'
      message.warning('登陆已过期,请重新登陆')
      window.location.pathname = '/sign-in'
    }
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

  config.headers.Authorization = store.getState().main.token;

  return config
}, handleErr)

// 响应拦截器
axiosInstance.interceptors.response.use((response) => {
  NProgress.done()
  return response;
}, handleErr);

export default axiosInstance