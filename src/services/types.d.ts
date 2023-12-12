interface BaseResponse {
  code: number;
  message: string;
}

interface ListResponseData<T> extends BaseResponse {
  data: {
    list: T[],
    count: number;
  }
}

interface ListQueries {
  page?: number;
  pageSize?: number;
}

interface BaseResponseWithData<T> {
  code: number;
  message: string;
  data: T
}

interface DeleteQueries {
  ids: string[],
  all?: boolean
}
