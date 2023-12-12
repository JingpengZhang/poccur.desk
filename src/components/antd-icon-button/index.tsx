import React from "react";
import {Button} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";

interface Props {
  label?: string;
  type: 'create' | 'delete',
  onClick?: () => void;
}

const AntdIconButton: React.FC<Props> = (props) => {
  return (
      <>
        {
            props.type === 'create' &&
            <Button onClick={() => props.onClick && props.onClick()} type='primary'
                    icon={<PlusOutlined/>}>{props.label || '添加项目'}</Button>
        }
        {
            props.type === 'delete' &&
            <Button danger type='primary' onClick={() => props.onClick && props.onClick()}
                    icon={<DeleteOutlined/>}>删除所选项</Button>

        }
      </>
  )
}

export default AntdIconButton