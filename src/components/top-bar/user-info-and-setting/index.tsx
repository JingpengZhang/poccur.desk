import React from "react";
import {Role} from "@/libs/role.enum.ts";
import {Popover} from "antd";
import {useAppSelector} from "@/hooks/use-redux.ts";
import {useNavigate} from "react-router-dom";
import {persistor} from "@/store";
import RoleList from "@/components/role-list";
import Avatar from "@/components/avatar";
import CommonUtils from "@/utils/common-utils.ts";

interface Setting {
  name: string;
  icon: string
  onClick: () => void
}

const UserInfoAndSetting: React.FC = () => {

  const navigate = useNavigate();

  const {username, avatar} = useAppSelector(state => state.user)

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
        persistor.purge().then(() => {
          navigate('/sign-in')
        })
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
          <Avatar placeholder={username} fontSize='text-3xl' config={{
            size: 46,
            src: (avatar && CommonUtils.getServerPrefix() + avatar) || undefined
          }}/>

          <div className='ml-3 h-full flex flex-col justify-between'>
            <p className='text-sm line-clamp-1'>{username || '用户名'}</p>
            <div className='flex-between'>
              <RoleList roles={roles} onlyOne/>
              <i className="bi bi-caret-down-fill text-blue-500 text-xs ml-3"></i>
            </div>
          </div>
        </div>
      </Popover>
  )
}

export default UserInfoAndSetting