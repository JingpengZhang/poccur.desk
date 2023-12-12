import React from "react";
import FourCircleSVG from "@/assets/svgs/four-circles.svg";
import {Space} from "antd";

interface Props {
  code?: number
  message?: string;
  extractRender?: React.ReactNode
}

const ErrorPage: React.FC<Props> = (props) => {
  return (
      <div
          style={{
            backgroundImage: `url(${FourCircleSVG})`
          }}
          className='w-screen h-screen'>
        <div className='h-full w-full bg-[rgba(0,0,0,0.9)] flex items-center justify-center'>
          <div className='flex items-center flex-col'>
            <h1 className='text-9xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent w-fit'>
              {props.code || 500}
            </h1>
            <p className='text-white text-xl mt-4 text-center'>{props.message || '服务器发生错误,请稍后再试!'}</p>
            {
                props.extractRender && <Space className='flex items-center justify-center mt-8 '>
                  {props.extractRender}
                </Space>
            }
          </div>
        </div>
      </div>
  )
}

export default ErrorPage