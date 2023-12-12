import React, {useEffect, useState} from "react";
import {Space, Table} from "antd";
import CUDialog from "@/pages/main/article-category/components/cu-dialog";
import useCuDialog from "@/hooks/use-cu-dialog.ts";
import {
  ArticleCategory,
  getArticleCategoryListRequest
} from "@/services/client/article-category.ts";
import IconButton from "@/components/icon-button";
import API from "@/services/api";
import AntdUtils from "@/utils/antd-utils.ts";
import AntdIconButton from "@/components/antd-icon-button";
import usePagination from "@/hooks/use-pagination.ts";
import AntdTableIdWithCopy from "@/components/antd-table-id-with-copy";
import useAntdTableSelect from "@/hooks/use-antd-table-select.ts";
import useAntdTablePaginationConfig from "@/hooks/use-antd-table-pagination-config.tsx";

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

  return <section>
    <Space className='mb-4'>
      <AntdIconButton label='添加分类' type='create' onClick={() => CUDialogState.openDialog()}/>
      {antdTableSelect.selectedKeys.length !== 0 &&
          <AntdIconButton type='delete' onClick={() => handleDelete(antdTableSelect.selectedKeys)}/>}
    </Space>
    <Table
        rowKey='id'
        dataSource={list}
        rowSelection={antdTableSelect.tableRowSelection}
        pagination={antdTablePaginationConfig}
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',
            width: 220,
            render: (value) => <AntdTableIdWithCopy id={value}/>
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
            render: (_, rowData) => <Space>
              <IconButton onClick={() => CUDialogState.openDialog('update', {
                data: rowData,
                updateId: rowData.id
              })} type='edit'/>
              <IconButton onClick={() => handleDelete([rowData.id])} type='delete'/>
            </Space>
          },
        ]}
    />

    <CUDialog {...CUDialogState} closeDialogFn={CUDialogState.closeDialog} submitCallback={getList}/>
  </section>
}

export default Page