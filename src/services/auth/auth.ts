import axios from "@/axios/axios.ts";
import API from "@/services/api";
import {Role} from "@/libs/role.enum.ts";

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

export interface SignInResponseData {
  token: string,
  userInfo: UserInfo
}

export const signInRequest = async (params: SignInFormParams) => {
  const result = await axios.post<BaseResponseWithData<SignInResponseData>>(AuthAPI.signIn, params)
  return result.data
}

export interface SignUpParams {
  email: string;
  password: string;
  username?: string;
  autoSignIn?: boolean;
  roles?: Role[];
}

export const signUpRequest = async (params: SignUpParams) => {
  const result = await axios.post<BaseResponseWithData<SignInResponseData>>(AuthAPI.signUp, params)
  return result.data
}