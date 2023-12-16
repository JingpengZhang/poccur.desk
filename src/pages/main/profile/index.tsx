import InsidePage from "@/components/inside-page";
import UserProfile from "@/pages/main/profile/components/user-profile";
import React from "react";
import DataDetail from "@/pages/main/profile/components/data-detail";
import BaseInfo from "@/pages/main/profile/components/base-info";

const ProfilePage: React.FC = () => {
  return (
      <InsidePage>
        <UserProfile/>
        <div className='mt-6 w-full flex items-start justify-between'>
          <div className='flex-grow mr-6'>
            <DataDetail/>
          </div>
          <div className='w-96 flex-shrink-0 h-20'>
            <BaseInfo/>
          </div>
        </div>
      </InsidePage>
  )
}

export default ProfilePage