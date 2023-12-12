import axios from "@/axios/axios.ts";
import API from "@/services/api";

const {create, list, update} = API.ClientAPI.articleCategory

export interface ArticleCategory {
  id: string;
  name: string;
  alias: string;
  description: string
}

export interface ArticleCategoryFormParams {
  name: string;
  alias: string;
  description: string
}

export const createArticleCategoryRequest = async (params: ArticleCategoryFormParams) => {
  const result = await axios.post<BaseResponse>(create, params);
  return result.data
}

export const getArticleCategoryListRequest = async (params?: ListQueries) => {
  const result = await axios.get<ListResponseData<ArticleCategory>>(list, params)
  return result.data
}

export const updateArticleCategoryRequest = async (params: ArticleCategoryFormParams & {
  id: string
}) => {
  const result = await axios.post<BaseResponse>(update, params);
  return result.data
}

export const deleteArticleCategoriesRequest = async (params: DeleteQueries) => {
  const result = await axios.post<BaseResponse>(API.ClientAPI.articleCategory.delete, params)
  return result.data
}