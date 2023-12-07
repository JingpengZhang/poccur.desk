import React, {useState} from "react";
import {Button, Space, Table, Tag} from "antd";
import {Menu} from "@/services/menu.ts";
import {Link} from "react-router-dom";
import CUPop from "@/pages/main/menu/components/cu-pop";

const Page: React.FC = () => {

  const [table, setTable] = useState<Menu[]>([
    {
      id: '65711376899e8cd54eb8db34',
      name: '菜单管理',
      path: '/main/menu',
      group: false,
      iconclass: 'bi bi-menu-app'
    }
  ])

  return (
      <div>
        <div>
          <div className='w-full flex items-center justify-between h-14'>
            <div className='flex items-center'></div>
            <div className='flex items-center h-full'>
              <Button type='primary' icon={<i className="bi bi-plus-square"></i>}>添加菜单</Button>
            </div>
          </div>
          <Table
              rowKey='id'
              dataSource={table}
              columns={[
                {
                  dataIndex: 'id',
                  title: 'ID',
                  width: 240,
                  ellipsis: true
                },
                {
                  dataIndex: 'name',
                  title: '名称',
                  width: 200,
                  ellipsis: true
                },
                {
                  dataIndex: 'iconclass',
                  title: '图标',
                  width: 100,
                  render(val) {
                    return <div className='w-6 aspect-square flex items-center justify-center'><i className={val}/>
                    </div>
                  }
                },
                {
                  dataIndex: 'group',
                  title: '是否为组',
                  width: 120,
                  render(val) {
                    return <Tag color={val ? 'green' : 'red'}>{val ? '是' : '否'}</Tag>
                  }
                },
                {
                  dataIndex: 'path',
                  title: '路径',
                  render(val) {
                    return <Link to={val} className='underline hover:underline hover:text-blue-600'>{val}</Link>
                  }
                },
                {
                  dataIndex: 'action',
                  width: 220,
                  render(_, row) {
                    return <Space>
                      <Button type='link'>编辑</Button>
                      <Button type='link'>删除</Button>
                    </Space>
                  }
                }
              ]}/>
        </div>
        <CUPop/>

      </div>
  )
}

export default Page