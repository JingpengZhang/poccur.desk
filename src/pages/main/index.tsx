import {Outlet} from "react-router-dom";
import TopBar from "@/components/top-bar";
import SideBar from "@/components/side-bar";
import withPrivateRoute from "@/hoc/with-private-route.tsx";


const Main = () => {
  return (
      <section className="min-h-screen w-full flex flex-col">
        <TopBar/>
        <section className='flex flex-grow'>
          <SideBar/>
          <section className=' flex-grow p-4 bg-mainBg'>
            <Outlet/>
          </section>
        </section>
      </section>
  )
}

export default withPrivateRoute(Main)