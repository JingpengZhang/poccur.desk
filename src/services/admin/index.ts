import axios from "@/axios/axios.ts";
import API from "@/services/api";

export const getSystemConfigRequest = async () => {
  const result = await axios.get<BaseResponseWithData<{
    superExist: boolean
  }>>(API.AdminAPI.systemConfig);
  return result.data
}