import React from "react";
import {Space} from "antd";

interface Props {
  title?: string,
  children?: React.ReactNode
  extractRender?: React.ReactNode,
  className?: string
  noHeader?: boolean
}

const Card: React.FC<Props> = (props) => {
  return (
      <div className={` bg-white rounded shadow ${props.className}`}>
        {
            !props.noHeader && <Space className='py-4 px-6 flex items-center justify-between'>
              <Space>
                <h2 className='font-bold flex items-center before:block before:w-2 before:aspect-square before:bg-primary before:rounded-full before:mr-3'>
                  {props.title}
                </h2>
              </Space>
              {props.extractRender}
            </Space>
        }
        {props.children}
      </div>
  )
}

export default Card