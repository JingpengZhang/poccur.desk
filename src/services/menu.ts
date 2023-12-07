import axios from "@/axios/axios.ts";
import API from "@/services/api";

export interface Menu {
  id: string;
  name: string;
  path: string;
  iconclass: string;
  group: boolean
}

export const createMenuRequest = (params: {
  name: string;
  path: string;
  iconclass: string;
  group: boolean
}) => {
  return axios.post(API.menu.create, params)
}