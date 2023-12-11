import {combineReducers} from "@reduxjs/toolkit";
import MainSlice from './main'

const reducers = combineReducers({
  main: MainSlice
})

export default reducers