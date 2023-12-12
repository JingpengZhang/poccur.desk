import axios from "@/axios/axios.ts";
import API from "@/services/api";

export interface Menu {
  id: string;
  name: string;
  path: string;
  iconclass: string;
  index: number;
  parent: string | null;
  enable: boolean;
  visible: boolean;
  children?: Menu[]
}

export interface MenuFormParams {
  name: string;
  path: string;
  iconclass: string;
  parent: string | null;
  enable: boolean;
  visible: boolean
}

export const createMenuRequest = async (params: MenuFormParams) => {
  const result = await axios.post<BaseResponse>(API.AdminAPI.menu.create, params)
  return result.data
}


export const getMenuListRequest = async (queries?: ListQueries) => {
  const result = await axios.get<ListResponseData<Menu>>(API.AdminAPI.menu.list, queries)
  return result.data
}

export const getMenuTreeRequest = async () => {
  const result = await axios.get<BaseResponseWithData<{
    menuTree: Menu[]
  }>>(API.AdminAPI.menu.tree)
  return result.data
}

export const updateMenuRequest = async (params: MenuFormParams & { id: string }) => {
  const result = await axios.post<BaseResponse>(API.AdminAPI.menu.update, params)
  return result.data;
}

export interface MenuIndexObj {
  id: string;
  index: number;
  parent: string | null
}

export const updateMenuIndexesRequest = async (params: {
  indexes: MenuIndexObj[]
}) => {
  const result = await axios.post<BaseResponse>(API.AdminAPI.menu.updateIndex, params)
  return result.data
}

export const deleteMenuRequest = async (params: {
  ids: string[]
}) => {
  const result = await axios.post<BaseResponse>(API.AdminAPI.menu.delete, params)
  return result.data
}
