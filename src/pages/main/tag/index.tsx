import React, {useState} from "react";
import InsidePage from "@/components/inside-page";
import TableModule, {OperateButton, ReplicableIDColumn, TableButton} from "@/components/table-module";
import {Space} from "antd";
import {getTagListRequest, Tag, TagFormParams} from "@/services/tag.ts";
import usePagination from "@/hooks/use-pagination.ts";
import CUDialog from "@/pages/main/tag/components/cu-dialog.tsx";
import useCuDialog from "@/hooks/use-cu-dialog.ts";
import AntdUtils from "@/utils/antd-utils.ts";
import API from "@/services/api";
import useAntdTablePaginationConfig from "@/hooks/use-antd-table-pagination-config.tsx";
import useAntdTableSelect from "@/hooks/use-antd-table-select.ts";

const TagPage: React.FC = () => {

  const [list, setList] = useState<Tag[]>([])

  const getList = () => {
    getTagListRequest({
      page: usePaginationState.params.page,
      pageSize: usePaginationState.params.pageSize
    }).then((res) => {
      usePaginationState.setParams({
        ...usePaginationState.params,
        total: res.data.count,
        currentPageTotal: res.data.list.length
      })
      setList(res.data.list)
    })
  }

  const usePaginationState = usePagination({
    onPageOrSizeChange: getList
  })

  const antdTablePaginationConfig = useAntdTablePaginationConfig(usePaginationState)

  const {tableRowSelection, selectedKeys, setSelectedKeys} = useAntdTableSelect()

  const CUDialogState = useCuDialog<TagFormParams>({
    name: '标签',
  })

  const deleteTags = (ids: string[], multiple = false) => {
    AntdUtils.deleteItemsByIdsConfirm(API.tag.delete, ids, () => {
      getList()
      if (multiple) setSelectedKeys([])
    })
  }

  return (
      <InsidePage>
        <TableModule<Tag>
            name='标签'
            operateRender={<Space>
              {selectedKeys.length !== 0 && <OperateButton.Delete onClick={() => deleteTags(selectedKeys, true)}/>}
              <OperateButton.Create onClick={CUDialogState.openDialog} name='添加标签'/>
            </Space>
            }
            tableProps={{
              rowKey: 'id',
              dataSource: list,
              pagination: antdTablePaginationConfig,
              rowSelection: tableRowSelection,
              columns: [
                {
                  title: 'ID',
                  dataIndex: 'id',
                  width: 280,
                  render: (value) => <ReplicableIDColumn id={value}/>
                },
                {
                  title: '名称',
                  dataIndex: 'name',
                },
                {
                  title: '创建人',
                  dataIndex: 'creator',
                  render: (value) => <span>{value.username}</span>
                },
                {
                  title: '操作',
                  dataIndex: 'actions',
                  width: 160,
                  render: (_, rowData) => <Space>
                    <TableButton.Edit onClick={() => CUDialogState.openDialog('update', {
                      updateId: rowData.id,
                      data: {
                        name: rowData.name
                      }
                    })}/>

                    <TableButton.Delete onClick={() => deleteTags([rowData.id])}/>
                  </Space>
                },
              ]
            }}
        >
        </TableModule>

        <CUDialog {...CUDialogState} submitCallback={getList}/>
      </InsidePage>
  )
}

export default TagPage