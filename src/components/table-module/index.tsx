import {Space, TableProps, Table, notification, Button} from "antd";
import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import Card from "@/components/card";

interface Props<T extends object> {
  name?: string;
  operateRender?: JSX.Element
  tableProps?: TableProps<T>
}

const TableModule = <T extends object>(props: Props<T>) => {
  return (
      <Card
          className='table-module'
          title={props.name}
          extractRender={
            props.operateRender
          }>
        <Table
            {...props.tableProps}
        />
      </Card>

  )
}

export default TableModule

interface ReplicableIDColumnProps {
  id: string
}

export const ReplicableIDColumn: React.FC<ReplicableIDColumnProps> = (props) => {
  return (
      <Space>
        <CopyToClipboard text={props.id} onCopy={() => notification.success({
          message: 'ID已复制到剪贴板'
        })}>
          <i className='bi bi-copy hover:text-primary transition-all cursor-pointer'/>
        </CopyToClipboard>
        <span>{props.id}</span>
      </Space>
  )
}

interface TableButtonProps {
  onClick?: () => void
}

const TableEditButton: React.FC<TableButtonProps> = (props) => {
  return <button
      onClick={() => props.onClick && props.onClick()}
      title='编辑'
      className=' w-6 aspect-square flex items-center justify-center rounded-md bg-blue-50 text-blue-500 hover:text-blue-50 hover:bg-blue-500 transition-all'>
    <i className="bi bi-pencil-square text-sm"/>
  </button>
}

const TableDeleteButton: React.FC<TableButtonProps> = (props) => {
  return <button
      onClick={() => props.onClick && props.onClick()}
      title='删除'
      className=' w-6 aspect-square flex items-center justify-center rounded-md bg-red-50 text-red-500 hover:text-red-50 hover:bg-red-500 transition-all'>
    <i className="bi bi-trash3 text-sm"/>
  </button>
}

export const TableButton = {
  Edit: TableEditButton,
  Delete: TableDeleteButton
}

interface OperateButtonProps {
  onClick?: () => void,
  name?: string
}

const OperateCreateButton: React.FC<OperateButtonProps> = (props) => {
  return <Button onClick={() => props.onClick && props.onClick()} type='primary'
                 icon={<PlusOutlined/>}>{props.name || '添加项目'}</Button>
}

const OperateDeleteButton: React.FC<OperateButtonProps> = (props) => {
  return <Button danger type='primary' onClick={() => props.onClick && props.onClick()}
                 icon={<DeleteOutlined/>}>{props.name || '删除所选项'}</Button>
}

export const OperateButton = {
  Create: OperateCreateButton,
  Delete: OperateDeleteButton
}