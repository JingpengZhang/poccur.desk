import React from "react";
import Breadcrumb from "@/components/breadcrumb";

interface Props {
  extractRender?: React.ReactNode,
  children?: React.ReactNode
}

const InsidePage: React.FC<Props> = (props) => {
  return (
      <section>
        <div className='flex items-center justify-between mb-4 h-8'>
          <Breadcrumb/>
          <div className='flex items-center'>
            {props.extractRender}
          </div>
        </div>
        <section>
          {props.children}
        </section>
      </section>
  )
}

export default InsidePage