import {TablePaginationConfig} from "antd";
import {UsePagination} from "@/hooks/use-pagination.ts";

const UseAntdTablePaginationConfig = (paginationState: UsePagination): TablePaginationConfig => {
  return {
    showTotal: (total: number) => <span>{`共${total}条数据`}</span>,
    current: paginationState.params.page,
    pageSize: paginationState.params.pageSize,
    total: paginationState.params.total,
    pageSizeOptions: paginationState.params.pageSizes,
    onChange: paginationState.onAntdPaginationChange,
    size: 'small'
  }
}

export default UseAntdTablePaginationConfig