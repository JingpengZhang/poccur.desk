import React from "react";
import CommonUtils from "@/utils/common-utils.ts";
import {Role} from "@/libs/role.enum.ts";
import {Avatar, Popover} from "antd";
import {useAppSelector} from "@/hooks/use-redux.ts";

interface Setting {
  name: string;
  icon: string
  onClick: () => void
}

const UserInfoAndSetting: React.FC = () => {

  const username = useAppSelector(state => state.user.username)

  const roles: Role[] = [
    Role.Super
  ]

  const settings: Setting[] = [
    {
      name: '个人资料',
      icon: "bi bi-person-badge",
      onClick() {
      }
    },
    {
      name: '消息中心',
      icon: 'bi bi-envelope',
      onClick() {
      }
    },
    {
      name: '退出登陆',
      icon: 'bi bi-door-closed',
      onClick() {
      }
    },

  ]

  return (
      <Popover
          placement="bottomRight"
          trigger='click'
          content={
            <ul>
              {
                settings.map((item, index) =>
                    <li key={index}>
                      <button onClick={item.onClick} className=' bg-transparent hover:bg-gray-100 px-3 h-9 rounded-md'>
                        <i className={item.icon}/>
                        <span className='ml-2'>{item.name}</span>
                      </button>
                    </li>
                )
              }
            </ul>
          }
      >
        <div className='flex items-center h-[4.5rem] py-3 cursor-pointer'>
          <Avatar size={46}>USER</Avatar>
          <div className='ml-3 h-full flex flex-col justify-between'>
            <p className='text-sm line-clamp-1'>{username || '用户名'}</p>
            <div className='flex-between'>
              <ul className='flex items-center'>
                {
                  CommonUtils.rolesFormat(roles).map(item =>
                      <li
                          style={{
                            backgroundColor: item.bgColor
                          }}
                          className='text-xs mr-2 last:mr-0 px-1 py-0.5 rounded'>
                    <span
                        style={{
                          color: item.color
                        }}
                    >{item.name}</span>
                      </li>
                  )
                }
              </ul>
              <i className="bi bi-caret-down-fill text-blue-500 text-xs ml-3"></i>
            </div>
          </div>
        </div>
      </Popover>
  )
}

export default UserInfoAndSetting