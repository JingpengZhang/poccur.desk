import {Outlet} from "react-router-dom";
import TopBar from "@/components/top-bar";
import SideBar from "@/components/side-bar";
import withPrivateRoute from "@/hoc/with-private-route.tsx";
import UI from "@/config/ui.ts";


const Main = () => {
  return (
      <section className="h-screen w-full flex flex-col">
        <TopBar/>
        <section
            style={{
              height: `calc(100% - ${UI.topBarHeight})`
            }}
            className='flex overflow-y-hidden'>
          <SideBar/>
          <section className=' flex-grow bg-mainBg h-full'>
            <Outlet/>
          </section>
        </section>
      </section>
  )
}

export default withPrivateRoute(Main)