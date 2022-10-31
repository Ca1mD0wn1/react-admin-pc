import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import store from 'store2'

export interface IAdminState {
  loginState: boolean
  adminname: string
  token: string
  role: number
  checkedKeys: any[]
}


const initialState: IAdminState = {
  loginState: store.get('haigou-users') ? store.get('haigou-users')['loginState'] : false,
  adminname: store.get('haigou-users') ? store.get('haigou-users')['adminname'] : '',
  token: store.get('haigou-users') ? store.get('haigou-users')['X-Token'] : '',
  role: store.get('haigou-users') ? store.get('haigou-users')['role'] : 0,
  checkedKeys: store.get('haigou-users') ? store.get('haigou-users')['checkedkeys'] : []
}
const adminSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    changeLoginState(state, action: PayloadAction<boolean>) {
      state.loginState = action.payload
    },
    changeAdminName(state, action: PayloadAction<string>) {
      state.adminname = action.payload
    },
    changeToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    changeRole(state, action: PayloadAction<number>) {
      state.role = action.payload
    },
    changeCheckedkeys(state, action: PayloadAction<any[]>) {
      state.checkedKeys = action.payload
    }
  }
})

export const {
  changeLoginState,
  changeAdminName,
  changeToken,
  changeRole,
  changeCheckedkeys
} = adminSlice.actions

export default adminSlice.reducer