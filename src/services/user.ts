import axios from "@/axios/axios.ts";
import API from "@/services/api";

export const updateAvatarRequest = async (params: FormData) => {
  const result = await axios.post<BaseResponseWithData<{
    path: string
  }>>(API.user.updateAvatar, params);
  return result.data
}