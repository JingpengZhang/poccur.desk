import axios from "@/axios/axios.ts";
import API from "@/services/api";

const {AuthAPI} = API

export const getCaptchaRequest = async () => {
  const result = await axios.get<BaseResponseWithData<{
    captcha: string
  }>>(AuthAPI.captcha)
  return result.data
}

export interface SignInFormParams {
  email: string,
  password: string,
  captchaCode: string
}

export interface UserInfo {
  id: string,
  username: string,
  email: string,
  roles: string[],
  avatar: string,
  registerTime: string,
  description: string,
}

export const signInRequest = async (params: SignInFormParams) => {
  const result = await axios.post<BaseResponseWithData<{
    token: string,
    userInfo: UserInfo
  }>>(AuthAPI.signIn, params)
  return result.data
}