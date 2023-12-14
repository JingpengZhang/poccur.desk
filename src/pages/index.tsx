import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const RootPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') navigate('/main')
  }, [location.pathname])

  return (
      <Outlet/>
  )
}

export default RootPage