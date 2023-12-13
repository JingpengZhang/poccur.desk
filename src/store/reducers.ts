import {combineReducers} from "@reduxjs/toolkit";
import MainSlice from './main'
import UserSlice from './user'

const reducers = combineReducers({
  main: MainSlice,
  user: UserSlice
})

export default reducers