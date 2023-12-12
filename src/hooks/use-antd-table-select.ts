import React, {useState} from "react";
import {TableRowSelection} from "antd/es/table/interface";

const UseAntdTableSelect = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const tableRowSelection: TableRowSelection<any> = {
    type: 'checkbox',
    onChange: (selectedKeys: React.Key[]) => setSelectedKeys(selectedKeys as string[])
  }

  return {
    selectedKeys,
    setSelectedKeys,
    tableRowSelection
  }
}

export default UseAntdTableSelect;