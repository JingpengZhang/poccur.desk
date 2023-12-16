import React from "react";
import Card from "@/components/card";
import {Space} from "antd";
import numeral from 'numeral'
import Avatar from "@/components/avatar";

const UserProfile: React.FC = () => {

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
                            shape: 'square'
                          }}
                  />
                  <div
                      className='absolute top-0 left-full group-hover:left-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex items-center justify-center'>
                    <i className="bi bi-pencil-square text-white cursor-pointer hover:text-primary transition-all"></i>
                  </div>
                </div>
                <div className='h-full ml-4 flex justify-between flex-col py-1'>
                  <p className='line-clamp-1'>Toni Stark</p>
                  <Space className='text-zinc-500 text-sm'>
                    <span className='line-clamp-1'>Full-Stack-Developer</span>
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
              <p className='text-sm text-zinc-500 mt-2 leading-6 line-clamp-2'>Vms
                具有清晰简洁的代码结构，易于理解和维护，具备良好的可扩展性，在此基础上进行二次开发更加高效；此外，开源社区的版本更新速度、Issue
                讨论、Bug fix 都非常迅速，为我们提供了好的支持。</p>
            </div>

          </div>
        </div>
      </Card>
  )
}

export default UserProfile