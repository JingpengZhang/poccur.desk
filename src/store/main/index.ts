import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMenuTreeRequest, Menu} from "@/services/menu.ts";
import {BreadCrumbItem} from "@/components/app-breadcrumb";

interface InitialState {
  menuTree: Menu[],
  breadcrumbItems: BreadCrumbItem[]
}

export const initialBreadcrumbItems: BreadCrumbItem[] = [
  {
    id: 'home',
    name: '首页',
    path: '/main',
    iconclass: 'bi bi-house',
  }
]

const initialState: InitialState = {
  menuTree: [],
  breadcrumbItems: initialBreadcrumbItems
}

export const fetchMenuTree = createAsyncThunk('main/getMenuTree', async () => {
  const response = await getMenuTreeRequest()
  return response.data.menuTree
})

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setBreadcrumbItems: (state, action: PayloadAction<BreadCrumbItem[]>) => {
      state.breadcrumbItems = initialBreadcrumbItems.concat(action.payload)
    }
  },
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

export const {setBreadcrumbItems} = mainSlice.actions
export default mainSlice.reducer