import React from "react";
import Breadcrumb from "@/components/breadcrumb";

interface Props {
  extractRender?: React.ReactNode,
  children?: React.ReactNode
}

const InsidePage: React.FC<Props> = (props) => {
  return (
      <section className='flex flex-col h-full overflow-y-auto relative'>
        <div className='flex items-center justify-between mb-4 sticky top-0 bg-spot-transparent p-4 z-50 shadow'>
          <Breadcrumb/>
          <div className='flex items-center'>
            {props.extractRender}
          </div>
        </div>
        <section className='flex flex-col flex-grow px-4 pb-4'>
          {props.children}
        </section>
      </section>
  )
}

export default InsidePage