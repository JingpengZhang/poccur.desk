import {ComponentType, useEffect} from "react";
import {useAppSelector} from "@/hooks/use-redux.ts";
import SignInPage from "@/pages/auth/sign-in";
import {useNavigate} from "react-router-dom";

const withPrivateRoute = (WrappedComponent: ComponentType) => {
  return () => {

    const navigate = useNavigate()

    const token = useAppSelector(state => state.main.token)

    useEffect(() => {
      if (!token) navigate('/sign-in')
    }, [token])


    return token ?
        <WrappedComponent/>
        :
        <SignInPage/>
  }
}

export default withPrivateRoute