import {SignInResponseData} from "@/services/auth/auth.ts";
import {fetchMenuTree, setToken} from "@/store/main";
import {fetchCurrentUserProfile} from "@/store/user";
import {useAppDispatch} from "@/hooks/use-redux.ts";

const useSignInCallback = () => {

  const dispatch = useAppDispatch()

  const run = (signInResponseData: SignInResponseData) => {
    const {token} = signInResponseData
    dispatch(setToken(token))
    dispatch(fetchCurrentUserProfile())
    dispatch(fetchMenuTree())
  }

  return {
    run
  }
}

export default useSignInCallback