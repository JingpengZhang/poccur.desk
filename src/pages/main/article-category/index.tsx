import React, {useEffect, useState} from "react";
import {Space} from "antd";
import CUDialog from "@/pages/main/article-category/components/cu-dialog";
import useCuDialog from "@/hooks/use-cu-dialog.ts";
import {
  ArticleCategory,
  getArticleCategoryListRequest
} from "@/services/client/article-category.ts";
import API from "@/services/api";
import AntdUtils from "@/utils/antd-utils.ts";
import usePagination from "@/hooks/use-pagination.ts";
import useAntdTableSelect from "@/hooks/use-antd-table-select.ts";
import useAntdTablePaginationConfig from "@/hooks/use-antd-table-pagination-config.tsx";
import TableModule, {
  OperateButton,
  ReplicableIDColumn, TableButton
} from "@/components/table-module";

const Page: React.FC = () => {

  useEffect(() => {
    getList()
  }, [])

  const [list, setList] = useState<ArticleCategory[]>([])

  const getList = () => {
    getArticleCategoryListRequest(
        {
          page: paginationState.params.page,
          pageSize: paginationState.params.pageSize
        }
    ).then((res) => {
      setList(res.data.list)
      paginationState.setParams({
        ...paginationState.params,
        total: res.data.count,
        currentPageTotal: res.data.list.length
      })
    })
  }

  const paginationState = usePagination({
    onPageOrSizeChange: getList
  });


  const CUDialogState = useCuDialog({
    name: '分类'
  })

  const handleDelete = (ids: string[]) => {
    AntdUtils.deleteItemsByIdsConfirm(API.ClientAPI.articleCategory.delete, ids, getList)
  }

  const antdTableSelect = useAntdTableSelect();

  const antdTablePaginationConfig = useAntdTablePaginationConfig(paginationState)

  return <>
    <TableModule<ArticleCategory>
        name='博文分类'
        operateRender={
          <Space>
            <OperateButton.Create
                name='添加分类 '
                onClick={() => CUDialogState.openDialog()}
            />
            {antdTableSelect.selectedKeys.length !== 0 &&
                <OperateButton.Delete
                    onClick={() => handleDelete(antdTableSelect.selectedKeys)}
                />
            }
          </Space>
        }
        tableProps={{
          rowKey: 'id',
          dataSource: list,
          rowSelection: antdTableSelect.tableRowSelection,
          pagination: antdTablePaginationConfig,
          columns: [
            {
              title: 'ID',
              dataIndex: 'id',
              width: 220,
              render: (value) => <ReplicableIDColumn id={value}/>
            },
            {
              title: '名称',
              dataIndex: 'name',
            },
            {
              title: '别名',
              dataIndex: 'alias',
            },
            {
              title: '描述',
              dataIndex: 'description',
            },
            {
              title: '操作',
              dataIndex: 'actions',
              width: 160,
              render: (_, rowData) => <Space>
                <TableButton.Edit
                    onClick={() => CUDialogState.openDialog('update', {
                      data: rowData,
                      updateId: rowData.id
                    })}/>
                <TableButton.Delete
                    onClick={() => handleDelete([rowData.id])}/>
              </Space>
            },
          ]
        }}
    />

    <CUDialog {...CUDialogState} closeDialogFn={CUDialogState.closeDialog} submitCallback={getList}/>
  </>
}

export default Page