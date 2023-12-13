import React from "react";
import {Space} from "antd";
import UserInfoAndSetting from "@/components/top-bar/user-info-and-setting";

const TopBar: React.FC = () => {
  return (
      <section className='w-full h-[4.5rem] flex items-center justify-between border-b'>
        <div className='flex items-center pl-4'>
          <div className='w-56'></div>
        </div>
        <Space className='flex items-center pr-6'>
          <UserInfoAndSetting/>
        </Space>
      </section>
  )
}

export default TopBar