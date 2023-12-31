import React from "react";
import Card from "@/components/card";
import {Space} from "antd";
import numeral from 'numeral'
import Avatar from "@/components/avatar";
import {useAppSelector} from "@/hooks/use-redux.ts";
import commonUtils from "@/utils/common-utils.ts";
import ChangeAvatarDialog from "@/components/change-avatar-dialog";
import useDialog from "@/hooks/use-dialog.ts";

const UserProfile: React.FC = () => {

  const {avatar, username, description, career} = useAppSelector(state => state.user)

  const statistics = [
    {
      title: 'Articles',
      data: 113
    },
    {
      title: 'Followers',
      data: 3400
    },
    {
      title: "Following",
      data: 23
    }
  ]

  const changeAvatarDialogState = useDialog({
    title: '修改头像'
  })

  return (
      <Card noHeader>
        <div className='p-6'>
          <div className='flex items-center'>
            <div className='w-[540px] mr-12 '>
              <div className='flex h-20'>
                <div className='relative rounded overflow-hidden group'>
                  <Avatar placeholder='USER' fontSize={'text-3xl'}
                          config={{
                            size: 80,
                            shape: 'square',
                            src: commonUtils.getServerPrefix() + avatar,
                            className: 'flex-shrink-0',
                          }}
                  />
                  <div
                      className='absolute top-0 left-full group-hover:left-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex items-center justify-center'>
                    <i onClick={changeAvatarDialogState.openDialog}
                       className="bi bi-pencil-square text-white cursor-pointer hover:text-primary transition-all"></i>
                  </div>
                </div>
                <div className='h-full ml-4 flex justify-between flex-col py-1'>
                  <p className='line-clamp-1'>{username}</p>
                  <Space className='text-zinc-500 text-sm'>
                    <span className='line-clamp-1'>{career}</span>
                  </Space>
                  <Space className='flex items-center text-xs text-zinc-500'>
                    <Space className='flex-center'>
                      <i className="bi bi-geo-alt"></i>
                      <span>安徽·安庆</span>
                    </Space>
                  </Space>
                </div>
              </div>
            </div>
            <div className='h-full flex-shrink-0 mr-12'>
              <ul className='flex items-center h-full'>
                {
                  statistics.map((item, index) =>
                      <li key={index}
                          className='border flex-shrink-0 w-24 border-dashed h-20 rounded-lg py-3   px-4 flex flex-col justify-between mr-4 last:mr-0'>
                        <p className='text-black font-bold text-xl'>{numeral(item.data).format('0.0a')}</p>
                        <p className='text-zinc-400 text-xs'>{item.title}</p>
                      </li>)
                }

              </ul>
            </div>
            <div className='flex-grow'>
              <h2 className='font-black'>个人简介</h2>
              <p className='text-sm text-zinc-500 mt-2 leading-6 line-clamp-2'>
                {description || '暂无'}
              </p>
            </div>

          </div>
        </div>

        <ChangeAvatarDialog {...changeAvatarDialogState} closeDialogCallback={changeAvatarDialogState.closeDialog}/>
      </Card>
  )
}

export default UserProfile