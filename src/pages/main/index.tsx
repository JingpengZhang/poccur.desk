import {Outlet} from "react-router-dom";
import TopBar from "@/components/common/top-bar";
import SideBar from "@/components/common/side-bar";

const Main = () => {
  return (
      <section className="min-h-screen w-full flex flex-col">
        <TopBar/>
        <section className='flex flex-grow'>
          <SideBar/>
          <section className=' flex-grow p-4'><Outlet/></section>
        </section>
      </section>
  )
}

export default Main