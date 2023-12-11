import React from "react";
import AppBreadcrumb from "@/components/app-breadcrumb";

const TopBar: React.FC = () => {
  return (
      <section className='w-full h-14 border-b px-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <div className='w-56'></div>
          <AppBreadcrumb/>
        </div>
      </section>
  )
}

export default TopBar