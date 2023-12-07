import axios, {AxiosError} from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/admin'
});

// 错误处理函数
const handleErr = (error: AxiosError) => {
  return Promise.reject(error);
};

// 请求拦截器
axiosInstance.interceptors.request.use((config) => {
  config.headers.token = '';
  return config
}, handleErr)

// 响应拦截器
axiosInstance.interceptors.response.use((response) => {
  return response;
}, handleErr);

export default axiosInstance