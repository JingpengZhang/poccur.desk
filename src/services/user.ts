import axios from "@/axios/axios.ts";
import API from "@/services/api";
import {Role} from "@/libs/role.enum.ts";


export interface UserProfile {
  "id": string,
  "email": string,
  avatar: string,
  "description": string,
  "roles": Role[],
  "career": string,
  "city": string,
  "company": string,
  "website": string,
  "username": string
  "registerTime": number
}


export const getUserProfileRequest = async (params: {
  id: string
}) => {
  const result = await axios.get<BaseResponseWithData<{
    profile: UserProfile
  }>>(API.user.profile, params);
  return result.data
}

export const getCurrentUserProfileRequest = async () => {
  const result = await axios.post<BaseResponseWithData<{
    profile: UserProfile
  }>>(API.user.getCurrentUserProfile)
  return result.data
}

export const updateAvatarRequest = async (params: FormData) => {
  const result = await axios.post<BaseResponseWithData<{
    path: string
  }>>(API.user.updateAvatar, params);
  return result.data
}

export interface UpdateUserInfoParams {
  id: string,
  username?: string;
  roles?: Role[];
  description?: string;
  career?: string;
  city?: string
  company?: string
  website?: string
}


export const updateUserProfileRequest = async (params: UpdateUserInfoParams) => {
  const result = await axios.post<BaseResponse>(API.user.update, params)
  return result.data
}