import {useEffect, useMemo, useState} from "react";

interface Params {
  page?: number;
  pageSize?: number;
  pageSizes?: number[];
  total?: number;
  currentPageTotal?: number
}

export interface UsePagination {
  params: Required<Params>,
  setParams: React.Dispatch<React.SetStateAction<Required<Params>>>,
  resetParams: () => void,
  onAntdPaginationChange: (page: number, pageSize: number) => void
}

const usePagination = (
    options?: {
      onPageOrSizeChange?: (page?: number, pageSize?: number) => void,
      reSetCurrentDeps?: React.DependencyList,
      initialPrams?: Params
    }
): UsePagination => {

  const initialPrams: Required<Params> = useMemo(() => {
    return {
      page: options?.initialPrams?.page || 1,
      pageSize: options?.initialPrams?.pageSize || 10,
      pageSizes: options?.initialPrams?.pageSizes || [10, 20, 30],
      total: options?.initialPrams?.total || 0,
      currentPageTotal: options?.initialPrams?.currentPageTotal || 0
    }
  }, [options?.initialPrams])

  const [params, setParams] = useState(initialPrams)

  // 页码或每页条数改变时,调用函数
  useEffect(() => {
    options?.onPageOrSizeChange && options.onPageOrSizeChange(params.page, params.pageSize);
  }, [params.page, params.pageSize])

  // 依赖项改变时,重新调用函数
  useEffect(() => {
    params.page === 1 ? options?.onPageOrSizeChange && options.onPageOrSizeChange(params.page, params.pageSize) : setParams({
      ...params,
      page: 1
    })
  }, [options?.reSetCurrentDeps])

  // 本页数据量为 0,且当前不在第一页时,自动请求上一页
  useEffect(() => {
    if (params.currentPageTotal === 0 && params.page > 1) setParams({
      ...params,
      page: params.page - 1
    })
  }, [params.currentPageTotal])

  const resetParams = () => {
    setParams(initialPrams)
  }

  const onAntdPaginationChange = (page: number, pageSize: number) => {
    setParams({
      ...params,
      page, pageSize
    })
  }

  return {
    params,
    setParams,
    resetParams,
    onAntdPaginationChange
  }
}

export default usePagination