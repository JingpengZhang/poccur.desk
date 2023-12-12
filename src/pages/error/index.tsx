import React from "react";
import {useNavigate, useRouteError} from "react-router-dom";
import FourCircleSVG from '@/assets/svgs/four-circles.svg'
import {Space} from "antd";

const NotFound: React.FC = () => {

  const navigate = useNavigate();

  const error = useRouteError() as any;
  console.error(error);

  const transferMessage = (message: string) => {
    if (message === "Not Found") return '页面未找到'
    return '未知错误'
  }

  return (
      <div
          style={{
            backgroundImage: `url(${FourCircleSVG})`
          }}
          className='w-screen h-screen'>
        <div className='h-full w-full bg-[rgba(0,0,0,0.9)] flex items-center justify-center'>
          <div className=''>
            <h1 className='text-9xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent w-fit'>{error.status}</h1>
            <p className='text-white text-2xl mt-4 text-center'>{transferMessage(error.statusText)}</p>

            <Space className='flex items-center  mt-8 '>
              <button
                  onClick={() => navigate(-1)}
                  className='bg-transparent border border-blue-500 rounded-xl h-9 px-4 text-blue-500 mr-4  hover:text-white hover:bg-blue-500 transition-all'>
                <i className="bi bi-backspace-fill mr-3 "></i>
                返回上一页
              </button>
              <button
                  onClick={() => navigate('/')}
                  className='bg-transparent border border-blue-500 rounded-xl h-9 px-4 text-blue-500 hover:text-white hover:bg-blue-500 transition-all'>
                <i className="bi bi-house-fill mr-3 "></i>
                回到首页
              </button>
            </Space>
          </div>
        </div>
      </div>
  )
}

export default NotFound