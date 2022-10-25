import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
  collapsed: boolean
}

const appSlice = createSlice({
  name: "collapsed",
  initialState: {
    collapsed: false,
  } as IState,
  reducers: {
    setCollapsed(state, action: PayloadAction<boolean>) {
      state.collapsed = action.payload
    }
  }
})

export const { setCollapsed } = appSlice.actions

export default appSlice.reducer

