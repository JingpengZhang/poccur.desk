import {UserInfo} from "@/services/auth/auth.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface InitialState extends UserInfo {

}

const initialState: InitialState = {
  id: '',
  username: '',
  email: '',
  roles: [],
  avatar: '',
  registerTime: '',
  description: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Partial<UserInfo>>) => {
      Object.assign(state, action.payload)
    },
  }
})

export const {setUserInfo} = userSlice.actions
export default userSlice.reducer