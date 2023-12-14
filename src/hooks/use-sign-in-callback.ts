import {SignInResponseData} from "@/services/auth/auth.ts";
import {fetchMenuTree, setToken} from "@/store/main";
import {setUserInfo} from "@/store/user";
import {useAppDispatch} from "@/hooks/use-redux.ts";

const useSignInCallback = () => {

  const dispatch = useAppDispatch()

  const run = (signInResponseData: SignInResponseData) => {
    const {token, userInfo} = signInResponseData
    dispatch(setToken(token))
    dispatch(setUserInfo(userInfo))
    dispatch(fetchMenuTree())
  }

  return {
    run
  }
}

export default useSignInCallback