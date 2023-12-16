import React from "react";
import {Role} from "@/libs/role.enum.ts";
import {Button, Space} from "antd";
import RoleList from "@/components/role-list";
import Avatar from "@/components/avatar";

const FollowerList: React.FC = () => {

  const followers = [
    {
      id: '223',
      email: 'jingpeng_zhang@foxmail.com',
      username: "JingpengZhang",
      avatar: 'https://spruko.com/demo/udon/dist/assets/images/faces/12.jpg',
      roles: [Role.Super, Role.Admin, Role.User]
    }
  ]

  return (
      <div>
        <ul className='grid grid-cols-3 gap-4'>
          {
            followers.map(item =>
                <li key={item.id} className='border rounded'>
                  <div className='flex items-center justify-center flex-col p-6 pb-0 border-b'>
                    <Avatar placeholder={item.username} config={{
                      size: 60,
                      src: item.avatar
                    }}/>
                    <span className='mt-3'>{item.username}</span>
                    <span className='text-zinc-400 text-xs'>{item.email}</span>
                    <RoleList className='my-4' onlyOne roles={item.roles}/>
                  </div>
                  <div className='p-3 flex justify-center'>
                    <Space>
                      <Button size='small' type='primary' icon={<i className="bi bi-chat-dots-fill"></i>}></Button>
                      <Button size='small' type='primary' icon={<i className="bi bi-person-dash-fill"></i>}></Button>
                    </Space>
                  </div>
                </li>
            )
          }
        </ul>
      </div>
  )
}

export default FollowerList