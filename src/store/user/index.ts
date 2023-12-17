import {UserInfo} from "@/services/auth/auth.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCurrentUserProfileRequest, UserProfile} from "@/services/user.ts";
import API from "@/services/api";

interface InitialState extends UserProfile {

}

const initialState: InitialState = {
  id: '',
  username: '',
  email: '',
  roles: [],
  avatar: '',
  registerTime: 0,
  description: '',
  career: '',
  city: '',
  company: '',
  website: '',
}

export const fetchCurrentUserProfile = createAsyncThunk(API.user.getCurrentUserProfile, async () => {
  const response = await getCurrentUserProfileRequest()
  return response.data.profile
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Partial<UserInfo>>) => {
      Object.assign(state, action.payload)
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchCurrentUserProfile.fulfilled, (state, action) => {
      Object.assign(state, action.payload)
    })
  }
})

export const {setUserInfo, setAvatar} = userSlice.actions
export default userSlice.reducer