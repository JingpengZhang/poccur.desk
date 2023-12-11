import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getMenuTreeRequest, Menu} from "@/services/menu.ts";

interface InitialState {
  menuTree: Menu[]
}

const initialState: InitialState = {
  menuTree: [],
}

export const fetchMenuTree = createAsyncThunk('main/getMenuTree', async () => {
  const response = await getMenuTreeRequest()
  return response.data.menuTree
})

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
        .addCase(fetchMenuTree.fulfilled, (state, action) => {
          state.menuTree = action.payload
        })
        .addCase(fetchMenuTree.pending, () => {

        })
        .addCase(fetchMenuTree.rejected, () => {

        })
  }
})

export const {} = mainSlice.actions
export default mainSlice.reducer