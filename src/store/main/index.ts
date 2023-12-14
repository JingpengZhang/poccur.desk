import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMenuTreeRequest, Menu} from "@/services/admin/menu.ts";
import {BreadCrumbItem} from "@/components/breadcrumb";

export interface RememberAccount {
  enable: boolean,
  email: string,
  password: string
}

interface InitialState {
  token: string,
  menuTree: Menu[],
  breadcrumbItems: BreadCrumbItem[],
  rememberAccount: RememberAccount
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
  token: '',
  menuTree: [],
  breadcrumbItems: initialBreadcrumbItems,
  rememberAccount: {
    enable: false,
    email: '',
    password: ''
  }
}

export const fetchMenuTree = createAsyncThunk('main/getMenuTree', async () => {
  const response = await getMenuTreeRequest()
  return response.data.menuTree
})

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = 'Bearer ' + action.payload
    },
    setRememberAccount: (state, action: PayloadAction<RememberAccount>) => {
      state.rememberAccount = action.payload
    },
    setBreadcrumbItems: (state, action: PayloadAction<BreadCrumbItem[]>) => {
      state.breadcrumbItems = initialBreadcrumbItems.concat(action.payload)
    },
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

export const {setBreadcrumbItems, setToken, setRememberAccount} = mainSlice.actions
export default mainSlice.reducer