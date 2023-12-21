import axios from "@/axios/axios.ts";
import API from "@/services/api";

export interface Tag {
  id: string
  name: string
  creator: {
    id: string
    username: string
  }
  updateAt: string
  createAt: string
}

export const getTagListRequest = async (params: ListQueries) => {
  const result = await axios.get<ListResponseData<Tag>>(API.tag.list, params)
  return result.data
}

export interface TagFormParams {
  name: string;
}

export const createTagRequest = async (params: TagFormParams) => {
  const result = await axios.post(API.tag.create, params)
  return result.data
}

export const deleteTagRequest = async (params: DeleteQueries) => {
  const result = await axios.post(API.tag.delete, params)
  return result.data
}

export const updateTagRequest = async (params: TagFormParams & {
  id: string
}) => {
  const result = await axios.post(API.tag.update, params)
  return result.data
}

