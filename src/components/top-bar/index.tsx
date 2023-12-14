import React from "react";
import {Space} from "antd";
import UserInfoAndSetting from "@/components/top-bar/user-info-and-setting";
import {Link} from "react-router-dom";
import Logo from '@/assets/images/logo.png'

const TopBar: React.FC = () => {
  return (
      <section className='w-full h-[4.5rem] flex items-center justify-between border-b'>
        <div className='flex items-center'>
          <div className='w-56 flex-center'>
            <Link to='/' className='font-apex font-bold flex-center'>
              <img className='h-6' src={Logo} alt='Logo'/>
              <span className='ml-2 text-2xl bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent'>Poccur</span>
            </Link>
          </div>
        </div>
        <Space className='flex items-center pr-6'>
          <UserInfoAndSetting/>
        </Space>
      </section>
  )
}

export default TopBar