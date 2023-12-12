import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {notification, Space} from "antd";

interface Props {
  id: string
}

const AntdTableIdWithCopy: React.FC<Props> = (props) => {
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

export default AntdTableIdWithCopy